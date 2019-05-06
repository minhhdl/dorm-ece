const express = require('express');
const { verifyJWT_MW, requireRoles } = require('./middlewares');
const { login, register, getUsers, activateUser, deactivateUser, regDorm } = require('./controllers/user.controller');
const { getDormRegistrations, activateRegistration } = require('./controllers/dorm.controller');

const router = express.Router();

router.post('/auth/login', login);
router.post('/users', register);
router.put('/users/:userId/activate', activateUser);
router.put('/users/:userId/deactivate', deactivateUser);
router.post('/users/dorm', verifyJWT_MW, regDorm);
router.get('/users', verifyJWT_MW, requireRoles(['admin']), getUsers);

router.get('/dorm-registrations', verifyJWT_MW, requireRoles(['admin']), getDormRegistrations);
router.put('/dorm-registrations/:regId/activate', verifyJWT_MW, requireRoles(['admin']), activateRegistration);

module.exports = router;
