const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

router.get('/alldata', async (req, res) => {
  const { email } = req.query;

  try {
    // Find the requesting user
    const requestingUser = await Account.findOne({ email });

    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).send({ message: 'Access denied' });
    }

    // Fetch all accounts and transactions
    const accounts = await Account.find();
    const transactions = await Transaction.find();

    res.status(200).send({ accounts, transactions });
  } catch (error) {
    res.status(500).send({ message: 'Fetching all data failed' });
  }
});

module.exports = router;
