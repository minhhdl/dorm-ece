const Notification = require('../models/notification');

const createNotification = async (req, res) => {
  try {
    const { title, content, type = 'system' } = req.body;

    const notification = new Notification({
      title,
      content,
      type,
    })

    await notification.save();

    return res.status(200).json({ status: '200', message: 'Create notification successfully', data: notification });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not create notification',
    })
  }
};

const getNotifications = async (req, res) => {
  try {
    const { receiver, type = 'normal' } = req.query;
    const notifications = await Notification
                        .find({ receiver, type }, '-__v')
                        // .skip(skip)
                        // .limit(limit)
                        .sort({ created_at: 'desc' })
                        .exec();
    return res.status(200).json({ notifications });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not get notifications',
    })
  }
};

const updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(notificationId, { ...req.body }).exec();

    return res.status(200).json({ status: '200', message: 'Update notification successfully', data: notification });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not update notification',
    })
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await Notification.findByIdAndDelete(notificationId).exec();

    return res.status(200).json({ status: '200', message: 'Delete notification successfully' });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not delete notification',
    })
  }
};

module.exports = {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
};