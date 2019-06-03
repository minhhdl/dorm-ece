const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  status: String,
  number_of_blank_dorm: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Room = new mongoose.model('Room', schema);

module.exports = Room;