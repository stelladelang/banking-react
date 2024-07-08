const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Account = require('../models/Account');

router.post('/accounts', async (req, res) => {
  console.log('Account creation request received', req.body);
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const account = new Account({ name, email, password: hashedPassword, role: 'customer' });
    await account.save();
    res.status(201).send(account);
  } catch (error) {
    res.status(400).send({ message: 'Account creation failed.' });
  }
});

module.exports = router;
