import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, name } = body;

    // format number: remove spaces/dashes, ensure country code included
    const formattedNumber = phoneNumber.replace(/\D/g, "");

    // your permanent access token (store in .env.local)
    const token = process.env.WHATSAPP_TOKEN!;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!; // from Meta dashboard
console.log(formattedNumber)
    // Example message: you can also use "template"
    const payload = {
      messaging_product: "whatsapp",
      to: formattedNumber,
      type: "text",
      text: {
        body: `Hi ${name}, thank you for sending your greetings! 🎉`
      }
    };

    const res = await fetch(
      `https://graph.facebook.com/v22.0/749853851553201/messages`,
      {
        method: "POST",
        headers: {
          Authorization: 'Bearer EAALKl2Y9pAQBPbkAL6S1UbeVf3ZBofNnRgIMoAXkmuj2Ws84vc0qRdDGSZCMFw5fmUvC7UZAIXeVdKodQ5jZC592NUzQwGJbsLZAJD1hZBKEY0LTjzXCRdAuZCxzhSblWYsldlA4wimJXKm6pFpsjXYSdxqv7aqndkiLzjGoxkmcXjYme50OSkxmfJCxTiFRCWjnSgwT62Etlio9VZCQjwI0Upwy9IPfKN3OiuiXmUHj9dhmZBAZDZD',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to:formattedNumber,
          type: "text",
          text: { 
            body: `Hi ${name}, thank you for sending your greetings! 🎉`,
          },
        }),
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
