// File: lib/firebaseAdmin.ts

import admin from 'firebase-admin';

// This checks if we've already initialized the app to prevent errors.
if (!admin.apps.length) {
  try {
    // We get the secret credentials from an environment variable.
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf-8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

// Export the firestore database instance for use in our API routes.
export const db = admin.firestore();