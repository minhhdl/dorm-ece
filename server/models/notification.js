const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: String,
  content: String,
  code: String,
  receiver: {
    type: 'ObjectId',
    ref: 'User',
  },
  owner: {
    type: 'ObjectId',
    ref: 'User',
  },
  type: String,
  seen: Boolean,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Notification = new mongoose.model('Notification', schema);

module.exports = Notification;