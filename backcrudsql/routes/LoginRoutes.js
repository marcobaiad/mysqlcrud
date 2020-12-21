const express = require('express');
const LoginControllers = require('../controllers/sessionControllers');
const router = express.Router();

router.post('/singin', LoginControllers.login);

router.post('/singup', LoginControllers.register);

router.get('/logout', LoginControllers.logout);

module.exports = router;