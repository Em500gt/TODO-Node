const { validationResult } = require('express-validator');
const todoServices = require('../services/todoServices.js');
const Sentry = require("@sentry/node");

class TodoController {
    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await todoServices.create({ ...req.body, user: req.userId });
            res.send("Task добавлен");
        }
        catch (error) {
            Sentry.captureException(error)
        }
    }

    async getMyTask(req, res) {
        try {
            const result = await todoServices.getTask(req.userId);
            res.send(result);
        }
        catch (error) {
            Sentry.captureException(error)
        }
    }

    async updateTitle(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            await todoServices.updateTitle({ id: req.params.id, userId: req.userId, title: req.body.title })
                .then((data) => {
                    if (!data) {
                        res.status(404).send("Task не обновлен")
                    }
                    res.status(200).send("Title записаны успешно")
                })
                .catch(() => res.status(404).send("Task не найден"));
        }
        catch (error) {
            Sentry.captureException(error)
        }

    }

    async isCompleted(req, res) {
        try {
            await todoServices.updateIsCompleted({ id: req.params.id, userId: req.userId })
                .then(() => res.status(200).send("isCompleted изменен"))
                .catch(() => res.status(404).send("Task не найден"));
        }
        catch (error) {
            Sentry.captureException(error)
        }
    }

    async deleteTask(req, res) {
        try {
            await todoServices.deleteTask({ id: req.params.id, userId: req.userId })
            .then((data) => {
                if (!data) {
                    res.status(404).send("Task не удален")
                }
                res.status(200).send("Task удален успешно")
            })
                .catch(() => res.status(404).send("Task не найден"));
        }
        catch (error) {
            Sentry.captureException(error)
        }
    }
}

module.exports = new TodoController();