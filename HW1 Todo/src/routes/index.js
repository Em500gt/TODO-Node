const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRouter.js');
const todoRouter = require('./todoRouter.js');

router.use('/', usersRouter);
router.use('/todos', todoRouter);

module.exports = router;