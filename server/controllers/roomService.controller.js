const User = require('../models/user');
const ServiceRegistration = require('../models/service-registration');
const Notification = require('../models/notification');

const getServiceRegistrations = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.per_page || 10);
    const skip = (page - 1) * limit;
    const data = await ServiceRegistration
                        .find({}, '-__v')
                        // .skip(skip)
                        // .limit(limit)
                        .sort({ created_at: 'desc' })
                        .populate({
                          path: 'user',
                          select: '-password',
                          populate: { path: 'currentRoom' },
                        })
                        .populate('room')
                        .exec();
    const totalItems = await ServiceRegistration.count();
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
      message: 'Can not get registrations',
    })
  }
}

const acceptServiceRegistration = async (req, res) => {
  try {
    const { regId } = req.params;
    const reg = await ServiceRegistration.findByIdAndUpdate(regId, { status: 'accepted' }).exec();
    await User.findByIdAndUpdate(reg.user, {
      parking: reg.parking,
      laundry: reg.laundry,
      internet: reg.internet,
    }).exec();

    const notification = new Notification({
      code: 'service-registration-accepted',
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

const rejectServiceRegistration = async (req, res) => {
  try {
    const { regId } = req.params;
    const reg = await ServiceRegistration.findByIdAndUpdate(regId, { status: 'rejected' }).exec();

    const notification = new Notification({
      code: 'service-registration-rejected',
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

module.exports = {
  getServiceRegistrations,
  acceptServiceRegistration,
  rejectServiceRegistration,
}