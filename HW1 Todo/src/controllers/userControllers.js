const { validationResult } = require("express-validator");
const userServices = require('../services/userServices.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Sentry = require("@sentry/node");

class UserControllers {

    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const checking = await userServices.checking(req.body.email)
            if (checking) {
                return res.status(400).send("Данный электронный адресс существует!");
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await userServices.registration({ ...req.body, password: hashedPassword });
            res.send("Пользователь зарегистрирован");
        }
        catch (error) {
            Sentry.captureException(error)
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            const user = await userServices.checking(email);
            if (!user) {
                return res.status(401).send("Неверный email или пароль!");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).send("Неверный email или пароль!");
            }

            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
            res.json({ token });
        }
        catch (error) {
            Sentry.captureException(error)
        }
    }
}

module.exports = new UserControllers();