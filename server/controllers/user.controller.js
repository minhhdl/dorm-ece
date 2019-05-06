const bcrypt = require('bcrypt');
const { createToken } = require('./auth.controller');
const User = require('../models/user');
const Room = require('../models/room');
const DormRegistration = require('../models/dorm-registration');

const register = async (req, res) => {
  try {
    const { ...user } = req.body;
    if (!user.role) user.role = 'student';
    
    const newUser = new User(user);
    await newUser.save();

    return res.json({
      status: 200,
      message: 'Register successfully',
      data: newUser,
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not create account',
      stack: e,
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      })
    }
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (isMatchPass) {
      user = user.toJSON();
      delete user.password;
      const access_token = await createToken({ user });
      return res.json({
        status: 200,
        user,
        access_token,
      })
    }
    return res.status(400).json({
      status: 400,
      message: 'Can not login',
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not login',
    })
  }
}

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.per_page || 10);
    const skip = (page - 1) * limit;
    const users = await User
                        .find({ role: { $ne: 'admin' } }, '-__v')
                        .skip(skip)
                        .limit(limit)
                        .sort({ priorities: 'desc', created_at: 'desc' })
                        .exec();
    const totalItems = await User.count();
    const pagination = {
      page,
      per_page: limit,
      total_pages: Math.ceil(totalItems/limit),
      total_results: totalItems,
    }
    return res.status(200).json({ users, pagination });
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

const regDorm = async (req, res) => {
  try {
    const { user } = req.auth;
    const { _id: userId } = user;
    const { sem1, sem2, sem3, room, bank_account_name, bank_account_number, image } = req.body;

    const dorm = new DormRegistration({
      sem1, sem2, sem3,
      bank_account_name, bank_account_number,
      room,
      user: userId,
      image,
    })

    await dorm.save();

    return res.status(200).json({ status: '200', message: 'Register dorm successfully', data: dorm });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can register dorm',
    })
  }
}

module.exports = {
  login,
  register,
  getUsers,
  activateUser,
  deactivateUser,
  regDorm,
}