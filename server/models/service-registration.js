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
  parking: Boolean,
  laundry: Boolean,
  internet: Boolean,
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

const ServiceRegistration = new mongoose.model('ServiceRegistration', schema);

module.exports = ServiceRegistration;