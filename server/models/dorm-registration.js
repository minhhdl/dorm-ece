const mongoose = require('mongoose');

const schema = mongoose.Schema({
  room: String,
  user: {
    type: 'ObjectId',
    ref: 'User',
  },
  sem1: Boolean,
  sem2: Boolean,
  sem3: Boolean,
  image: String,
  bank_account_name: String,
  bank_account_number: String,
});

const DormRegistration = new mongoose.model('DormRegistration', schema);

module.exports = DormRegistration;