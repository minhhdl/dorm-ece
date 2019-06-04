const express = require('express');
const { verifyJWT_MW, requireRoles } = require('./middlewares');
const {
  login, register, getUsers, activateUser, deactivateUser, regDorm,
  deleteUser, updateUser, regServices,
} = require('./controllers/user.controller');
const { getDormRegistrations, acceptRegistration, rejectRegistration, deleteDormRegistration } = require('./controllers/dorm.controller');
const { getServiceRegistrations, acceptServiceRegistration, rejectServiceRegistration } = require('./controllers/roomService.controller');
const { getRooms, createRoom, updateRoom, deleteRoom } = require('./controllers/room.controller');
const { getNotifications, createNotification, deleteNotification } = require('./controllers/notification.controller');


const router = express.Router();

router.get('/users', verifyJWT_MW, requireRoles(['admin']), getUsers);
router.post('/auth/login', login);
router.post('/users', register);
router.put('/users/:userId/activate', activateUser);
router.put('/users/:userId/deactivate', deactivateUser);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', verifyJWT_MW, requireRoles(['admin']), deleteUser);
router.post('/users/dorm', verifyJWT_MW, regDorm);
router.post('/users/services', verifyJWT_MW, regServices);

router.get('/rooms', verifyJWT_MW, getRooms);
router.post('/rooms', verifyJWT_MW, requireRoles(['admin']), createRoom);
router.patch('/rooms/:roomId', verifyJWT_MW, requireRoles(['admin']), updateRoom);
router.delete('/rooms/:roomId', verifyJWT_MW, requireRoles(['admin']), deleteRoom);

router.get('/dorm-registrations', verifyJWT_MW, requireRoles(['admin']), getDormRegistrations);
router.put('/dorm-registrations/:regId/accept', verifyJWT_MW, requireRoles(['admin']), acceptRegistration);
router.put('/dorm-registrations/:regId/reject', verifyJWT_MW, requireRoles(['admin']), rejectRegistration);
router.delete('/dorm-registrations/:regId', verifyJWT_MW, requireRoles(['admin']), deleteDormRegistration);

router.get('/service-registrations', verifyJWT_MW, requireRoles(['admin']), getServiceRegistrations);
router.put('/service-registrations/:regId/accept', verifyJWT_MW, requireRoles(['admin']), acceptServiceRegistration);
router.put('/service-registrations/:regId/reject', verifyJWT_MW, requireRoles(['admin']), rejectServiceRegistration);

router.get('/notifications', verifyJWT_MW, getNotifications);
router.post('/notifications', verifyJWT_MW, requireRoles(['admin']), createNotification);
router.delete('/notifications/:notificationId', verifyJWT_MW, requireRoles(['admin']), deleteNotification);

module.exports = router;
