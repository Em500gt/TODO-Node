const { validationResult } = require('express-validator');
const todoServices = require('../services/todoServices.js');
const { v4: uuidv4 } = require('uuid');
const Sentry = require("@sentry/node");

class TodoController {
    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Sentry.captureException(res.status(400).json({ errors: errors.array() }));
        }
        await todoServices.create({ id: uuidv4(), ...req.body, userId: req.userId });
        res.send("Task добавлен");
    }

    async getMyTask(req, res) {
        const result = await todoServices.getTask(req.userId);
        res.send(result);
    }

    async updateTitle(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Sentry.captureException(res.status(400).json({ errors: errors.array() }));
        }
        await todoServices.updateTitle({ id: req.params.id, title: req.body.title })
            .then(() => res.status(200).send("Title записаны успешно"))
            .catch(() => Sentry.captureException(res.status(404).send("Task не найден")));

    }

    async isCompleted(req, res) {
        await todoServices.updateIsCompleted(req.params.id)
            .then(() => res.status(200).send("isCompleted изменен"))
            .catch(() => Sentry.captureException(res.status(404).send("Task не найден")));
    }

    async deleteTask(req, res) {
        await todoServices.deleteTask(req.params.id)
            .then(() => res.status(200).send("Task удален"))
            .catch(() => Sentry.captureException(res.status(404).send("Task не найден")));
    }
}

module.exports = new TodoController();