// File: app/api/send-whatsapp/route.ts

import { NextResponse } from 'next/server';

// --- Configuration from Environment Variables ---
const sfmc = {
  clientId: process.env.SFMC_CLIENT_ID,
  clientSecret: process.env.SFMC_CLIENT_SECRET,
  authUrl: process.env.SFMC_AUTH_URL,
  restUrl: process.env.SFMC_REST_URL,
  definitionKey: process.env.SFMC_DEFINITION_KEY,
};

// --- In-memory cache for the Access Token ---
let tokenCache = {
  token: null as string | null,
  expiresAt: 0,
};

// --- Function to Get a Valid Access Token ---
async function getAccessToken(): Promise<string> {
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 60000) {
    return tokenCache.token;
  }

  const response = await fetch(sfmc.authUrl!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: sfmc.clientId!,
      client_secret: sfmc.clientSecret!,
    }),
  });

  if (!response.ok) {
    throw new Error('Could not authenticate with Marketing Cloud.');
  }

  const data = await response.json();
  tokenCache.token = data.access_token;
  tokenCache.expiresAt = Date.now() + (data.expires_in * 1000);

  return tokenCache.token!;
}

// --- Main API Handler ---
export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    const formattedPhoneNumber = phoneNumber.startsWith('91')
      ? phoneNumber
      : `91${phoneNumber}`;
    // const formattedPhoneNumber = "917012257903"; // as string

    const payload = {
      definitionKey: sfmc.definitionKey,
      recipients: [
        {
          contactKey: formattedPhoneNumber,
          to: formattedPhoneNumber,
        },
      ],
    };

    // Send the message using the Trigger API
    const sendMessageResponse = await fetch(sfmc.restUrl!, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await sendMessageResponse.json();
    console.log("SFMC Trigger Send Response:", result);

    if (!sendMessageResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send message via Marketing Cloud.',
          details: result,
        },
        { status: sendMessageResponse.status }
      );
    }

    // ✅ Return SFMC's actual response for debugging
    return NextResponse.json({
      success: true,
      message: 'Request accepted by SFMC.',
      sfmcResponse: result,
    });

  } catch (error: any) {
    console.error('An error occurred:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
