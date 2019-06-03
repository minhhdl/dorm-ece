const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  is_verified: Boolean,
  password: String,
  fullname: String,
  role: String,
  phone: String,
  dob: String,
  gender: String,
  address: String,
  ethnic: String,
  identity_number: String,
  identity_card_front: String,
  identity_card_back: String,
  priorities: [
    {
      name: String,
      image: String,
    },
  ],
  is_old_student: Boolean,
  is_new_student: Boolean,
  new_student_info: {
    registration_number: String,
    speciality_code: String,
    offer_letter_image: String,
  },
  old_student_info: {
    student_code: String,
    class: String,
    faculty: String,
  },
  registered_services: [
    {
      name: String,
      key: String,
      register_date: Date,
    },
  ],
  currentRoom: {
    type: 'ObjectId',
    ref: 'Room',
  },
  parking: Boolean,
  laundry: Boolean,
  internet: Boolean,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

schema.virtual('priorLength').get(function(){
  return this.priorities.length;
});
schema.set('toJSON', {
  virtuals: true,
});
schema.set('toObject', {
  virtuals: true,
});

const User = new mongoose.model('User', schema);

module.exports = User;