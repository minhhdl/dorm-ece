const Room = require('../models/room');

const getRooms = async (req, res) => {
  try {
    const { ...query } = req.query;
    const rooms = await Room.find({ ...query }).exec();

    return res.status(200).json({ status: '200', message: 'Get rooms successfully', data: rooms });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not get rooms',
    })
  }
};

const createRoom = async (req, res) => {
  try {
    const { name, status = 'not-full', number_of_blank_dorm = 4 } = req.body;

    const room = new Room({
      name,
      status,
      number_of_blank_dorm,
    })

    await room.save();

    return res.status(200).json({ status: '200', message: 'Create room successfully', data: room });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not create room',
    })
  }
};

const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findByIdAndUpdate(roomId, { ...req.body }).exec();

    return res.status(200).json({ status: '200', message: 'Update room successfully', data: room });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not update room',
    })
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    await Room.findByIdAndDelete(roomId).exec();

    return res.status(200).json({ status: '200', message: 'Delete room successfully' });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Can not delete room',
    })
  }
};

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};