const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

router.post('/deposit', async (req, res) => {
  const { email, amount } = req.body;

  try {
    // Find the account
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(400).send({ message: 'Account not found' });
    }

    // Update the account balance
    account.balance += amount;
    await account.save();

    // Create a new transaction
    const transaction = new Transaction({ type: 'deposit', email, amount });
    await transaction.save();

    res.status(200).send(account);
  } catch (error) {
    res.status(500).send({ message: 'Deposit failed' });
  }
});

module.exports = router;
