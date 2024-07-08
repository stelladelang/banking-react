const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' }, // Add role field
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
