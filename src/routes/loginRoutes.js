const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');
const Account = require('../models/Account');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify email and password with Firebase
    const user = await admin.auth().getUserByEmail(email);
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Check if the user exists in MongoDB
    const account = await Account.findOne({ email: user.email });
    if (!account) {
      return res.status(400).send({ message: 'Account does not exist' });
    }

    // Respond with the user account data
    res.status(200).send(account);
  } catch (error) {
    res.status(500).send({ message: 'Login failed' });
  }
});

module.exports = router;
