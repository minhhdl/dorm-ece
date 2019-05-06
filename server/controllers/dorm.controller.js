const bcrypt = require('bcrypt');
const { createToken } = require('./auth.controller');
const User = require('../models/user');
const Room = require('../models/Room');
const DormRegistration = require('../models/dorm-registration');

const getDormRegistrations = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.per_page || 10);
    const skip = (page - 1) * limit;
    const data = await DormRegistration
                        .find({}, '-__v')
                        .skip(skip)
                        .limit(limit)
                        .sort({ created_at: 'desc' })
                        .populate('user')
                        .exec();
    const totalItems = await DormRegistration.count();
    const pagination = {
      page,
      per_page: limit,
      total_pages: Math.ceil(totalItems/limit),
      total_results: totalItems,
    }
    return res.status(200).json({ data, pagination });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not get users',
    })
  }
}

const activateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { is_verified: true }).exec();
    return res.status(200).json({ status: '200', message: 'Activate user successfully' });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not get users',
    })
  }
}

const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { is_verified: false }).exec();
    return res.status(200).json({ status: '200', message: 'Deactivate user successfully' });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not get users',
    })
  }
}

module.exports = {
  getDormRegistrations,
  activateUser,
  deactivateUser,
}