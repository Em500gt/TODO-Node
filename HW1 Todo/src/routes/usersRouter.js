const express = require('express');
const router = express.Router();
const validation = require('../helpers/validation.js');
const userControllers = require('../controllers/userControllers.js');

router.post('/login', validation.validUser(), userControllers.login);
router.post('/register', validation.validUser(), validation.validAge(), validation.validName(), userControllers.registration);

module.exports = router;