const express = require('express');
const router = express.Router();
const LoginRoutes = require('./LoginRoutes');
const worksRoutes = require('./worksRoutes');

router.use('/', LoginRoutes);
router.use('/', worksRoutes);

module.exports = router