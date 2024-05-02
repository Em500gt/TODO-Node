const express = require('express');
const router = express.Router();
const validation = require('../helpers/validation.js');
const authorization = require('../helpers/authenticateToken.js');
const todoController = require('../controllers/todoController.js');

router.route('/')
    .post(authorization, validation.validTodosTitle(), validation.validTodosIsCompleted(), todoController.create)
    .get(authorization, todoController.getMyTask);

router.route('/:id')
    .patch(authorization, validation.validTodosTitle(), todoController.updateTitle)
    .delete(authorization, todoController.deleteTask);

router.patch('/:id/isCompleted', authorization, todoController.isCompleted);

module.exports = router;