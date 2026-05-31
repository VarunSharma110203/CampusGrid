// CampusGrid Firebase SDK Configuration
// To connect your prototype to a live Firebase instance:
// 1. Go to Firebase Console (https://console.firebase.google.com/)
// 2. Create a new Firebase project (e.g., CampusGrid).
// 3. Register a Web App under the project settings to get your configuration credentials.
// 4. Enable "Email/Password" provider in Firebase Auth (Authentication -> Sign-in method).
// 5. Enable Cloud Firestore database.
// 6. Paste your Firebase SDK config below:

const firebaseConfig = {
  apiKey: "AIzaSyCyI9UBBSZbvbfKeyYp13-kCCZAVEw82WI",
  authDomain: "kampusgrid.firebaseapp.com",
  projectId: "kampusgrid",
  storageBucket: "kampusgrid.firebasestorage.app",
  messagingSenderId: "354413218045",
  appId: "1:354413218045:web:00fbda04d37759859ed694"
};

// Auto-check if configuration has been customized
const isFirebaseConfigured = firebaseConfig.projectId && firebaseConfig.projectId !== "YOUR_PROJECT_ID";
