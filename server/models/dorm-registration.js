const mongoose = require('mongoose');

const schema = mongoose.Schema({
  room: {
    type: 'ObjectId',
    ref: 'Room',
  },
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
  status: {
    type: String,
    default: 'pending'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const DormRegistration = new mongoose.model('DormRegistration', schema);

module.exports = DormRegistration;