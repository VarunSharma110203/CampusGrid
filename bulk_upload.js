/**
 * CampusGrid - Bulk User Upload and Schema Initialization Tool
 * 
 * Usage:
 *   node bulk_upload.js [path/to/users_seed.json] [--dry-run]
 * 
 * To run in live mode:
 *   1. Download your service account key JSON from the Firebase Console (Project Settings -> Service Accounts).
 *   2. Save it in the project root as `serviceAccountKey.json`.
 *   3. Run: node bulk_upload.js
 */

const fs = require('fs');
const path = require('path');

// Constants
const DEFAULT_SEED_FILE = path.join(__dirname, 'users_seed.json');
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'serviceAccountKey.json');
const DEFAULT_PASSWORD = 'password123'; // Default password for new auth users

// Parse CLI Arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const seedFilePath = args.find(arg => arg.endsWith('.json')) || DEFAULT_SEED_FILE;

// Determine if we should run in live mode
let admin;
let db;
let isLive = false;

console.log('================================================================');
console.log('   CAMPUSGRID FIREBASE BULK UPLOAD TOOL');
console.log('================================================================');

if (isDryRun) {
  console.log('👉 Running in explicit DRY-RUN mode. No changes will be written.');
} else if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
  console.log('👉 No serviceAccountKey.json found in the project root.');
  console.log('👉 Defaulting to SIMULATION / DRY-RUN mode.');
  console.log('\n   To run in LIVE mode:');
  console.log('   1. Go to Firebase Console -> Project Settings -> Service Accounts');
  console.log('   2. Generate a new private key and save it as:');
  console.log(`      ${SERVICE_ACCOUNT_FILE}`);
  console.log('   3. Run this script again: npm run bulk-upload\n');
} else {
  try {
    admin = require('firebase-admin');
    const serviceAccount = require(SERVICE_ACCOUNT_FILE);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    
    db = admin.firestore();
    isLive = true;
    console.log('✅ Firebase Admin initialized. Connection to Firestore established!');
  } catch (err) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', err.message);
    console.log('👉 Falling back to DRY-RUN mode.');
  }
}

// Main execution block
async function run() {
  // Check if seed file exists
  if (!fs.existsSync(seedFilePath)) {
    console.error(`❌ Seed file not found at: ${seedFilePath}`);
    process.exit(1);
  }

  // Load and parse user seed data
  let users = [];
  try {
    const rawData = fs.readFileSync(seedFilePath, 'utf8');
    users = JSON.parse(rawData);
    console.log(`📚 Loaded ${users.length} user records from ${path.basename(seedFilePath)}`);
  } catch (err) {
    console.error('❌ Error parsing seed file:', err.message);
    process.exit(1);
  }

  console.log('\n--- Processing Users ---');
  let successCount = 0;
  let skippedCount = 0;

  for (const user of users) {
    const { email, name, role } = user;
    if (!email || !name || !role) {
      console.warn(`⚠️ Skipping invalid user record: ${JSON.stringify(user)}`);
      skippedCount++;
      continue;
    }

    console.log(`\n👤 User: ${name} (${email}) [Role: ${role.toUpperCase()}]`);

    // Prepare Firestore data structure
    const firestoreUserData = {
      email: email,
      name: name,
      role: role,
      updatedAt: new Date().toISOString()
    };

    if (role === 'student' && user.enrolledCourses) {
      firestoreUserData.enrolledCourses = user.enrolledCourses;
      console.log(`   └─ Enrolled courses: ${user.enrolledCourses.join(', ')}`);
    } else if (role === 'faculty' && user.taughtCourses) {
      firestoreUserData.taughtCourses = user.taughtCourses;
      console.log(`   └─ Taught courses: ${user.taughtCourses.join(', ')}`);
    }

    if (isLive) {
      try {
        // 1. Create or retrieve Authentication record
        let authUser;
        try {
          authUser = await admin.auth().createUser({
            email: email,
            emailVerified: true,
            password: DEFAULT_PASSWORD,
            displayName: name,
            disabled: false,
          });
          console.log(`   ✅ Auth user created successfully (UID: ${authUser.uid})`);
        } catch (authError) {
          if (authError.code === 'auth/email-already-exists') {
            authUser = await admin.auth().getUserByEmail(email);
            console.log(`   ℹ️ Auth user already exists. Re-using UID: ${authUser.uid}`);
            
            // Optionally update user info
            await admin.auth().updateUser(authUser.uid, {
              displayName: name
            });
          } else {
            throw authError;
          }
        }

        // 2. Set custom claims for security-level roles if needed
        // (optional, but standard for production RBAC)
        await admin.auth().setCustomUserClaims(authUser.uid, { role: role });
        console.log(`   ✅ Set role claim: { role: "${role}" }`);

        // 3. Write User metadata and mappings to Firestore
        await db.collection('users').doc(email).set(firestoreUserData, { merge: true });
        console.log(`   ✅ Firestore document updated`);
        
        successCount++;
      } catch (err) {
        console.error(`   ❌ Failed to process ${email}:`, err.message);
      }
    } else {
      // Dry run simulation logs
      console.log(`   [Simulate] admin.auth().createUser({ email: "${email}", password: "${DEFAULT_PASSWORD}", ... })`);
      console.log(`   [Simulate] admin.auth().setCustomUserClaims(uid, { role: "${role}" })`);
      console.log(`   [Simulate] db.collection("users").doc("${email}").set(${JSON.stringify(firestoreUserData)})`);
      successCount++;
    }
  }

  console.log('\n================================================================');
  console.log('   BULK UPLOAD COMPLETED');
  console.log('================================================================');
  console.log(`   Processed successfully : ${successCount}`);
  console.log(`   Skipped/Failed         : ${skippedCount}`);
  console.log(`   Mode                   : ${isLive ? 'LIVE' : 'SIMULATION (DRY-RUN)'}`);
  if (!isLive) {
    console.log(`   Default Password set   : ${DEFAULT_PASSWORD} (Simulation only)`);
  } else {
    console.log(`   All users initialized with default password: ${DEFAULT_PASSWORD}`);
    console.log('   Users can log in and Firebase role security rules will apply.');
  }
  console.log('================================================================');
}

run();
