const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Account = require('./src/models/Account'); // Adjust the path based on your directory structure
const admin = require('firebase-admin');
const serviceAccount = require('./src/config/serviceAccountKey.json'); // Adjust the path to your service account key

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose.connect('mongodb://localhost:27017/badbank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
  const email = 'admin@example.com';
  const password = 'adminpassword'; // Set your desired password

  try {
    // Create the admin user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: true,
      disabled: false,
    });

    console.log('Successfully created new user in Firebase:', userRecord.uid);

    // Hash the password for MongoDB storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user in MongoDB
    const adminAccount = new Account({
      name: 'Admin',
      email: email,
      password: hashedPassword,
      balance: 0,
      role: 'admin', // Ensure the role is set to 'admin'
    });

    await adminAccount.save();
    console.log('Admin account created in MongoDB');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.connection.close();
  }
}

createAdmin();
