const bcrypt = require('bcrypt');
const { createToken } = require('./auth.controller');
const User = require('../models/user');
const Room = require('../models/room');
const DormRegistration = require('../models/dorm-registration');
const Notification = require('../models/notification');

const getDormRegistrations = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.per_page || 10);
    const skip = (page - 1) * limit;
    const data = await DormRegistration
                        .find({}, '-__v')
                        // .skip(skip)
                        // .limit(limit)
                        .sort({ created_at: 'desc' })
                        .populate({
                          path: 'user',
                          select: '-password'
                        })
                        .populate('room')
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

const acceptRegistration = async (req, res) => {
  try {
    const { regId } = req.params;
    const reg = await DormRegistration.findByIdAndUpdate(regId, { status: 'accepted' }).exec();
    await User.findByIdAndUpdate(reg.user, { currentRoom: reg.room });
    const room = await Room.findById(reg.room).exec();
    let { number_of_blank_rom, status } = room;

    await Room.findByIdAndUpdate(reg.room, {
      number_of_blank_rom: number_of_blank_rom + 1,
      status: number_of_blank_rom < 1 ? 'full' : 'not-full',
    });

    const notification = new Notification({
      code: 'dorm-registration-accepted',
      receiver: reg.user,
      type: 'normal',
    });

    await notification.save();

    return res.status(200).json({ status: '200', message: 'Activate registration successfully' });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not update',
    })
  }
}

const rejectRegistration = async (req, res) => {
  try {
    const { regId } = req.params;
    const reg = await DormRegistration.findByIdAndUpdate(regId, { status: 'rejected' }).exec();

    const notification = new Notification({
      code: 'dorm-registration-rejected',
      receiver: reg.user,
      type: 'normal',
    });

    await notification.save();

    return res.status(200).json({ status: '200', message: 'Reject registration successfully' });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not update',
    })
  }
}

const deleteDormRegistration = async (req, res) => {
  try {
    const { regId } = req.params;

    await DormRegistration.findByIdAndDelete(regId).exec();

    return res.status(200).json({ status: '200', message: 'Delete registration successfully' });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not delete registration',
    })
  }
}

module.exports = {
  getDormRegistrations,
  acceptRegistration,
  rejectRegistration,
  deleteDormRegistration,
}