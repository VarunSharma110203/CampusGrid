// CampusGrid Firebase SDK Configuration
// To connect your prototype to a live Firebase instance:
// 1. Go to Firebase Console (https://console.firebase.google.com/)
// 2. Create a new Firebase project (e.g., CampusGrid).
// 3. Register a Web App under the project settings to get your configuration credentials.
// 4. Enable "Email/Password" provider in Firebase Auth (Authentication -> Sign-in method).
// 5. Enable Cloud Firestore database.
// 6. Paste your Firebase SDK config below:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Auto-check if configuration has been customized
const isFirebaseConfigured = firebaseConfig.projectId && firebaseConfig.projectId !== "YOUR_PROJECT_ID";
