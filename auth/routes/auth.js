const express= require('express');
const router= express.Router();

const AUTH_CONTROLLERS = require('../controllers/auth');

router.post('/signup', AUTH_CONTROLLERS.createUser);

router.post('/signin', AUTH_CONTROLLERS.signinUser);

router.post('/validateToken', AUTH_CONTROLLERS.validateToken);

module.exports = router;