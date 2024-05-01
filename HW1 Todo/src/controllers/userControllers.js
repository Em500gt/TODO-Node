const { validationResult } = require("express-validator");
const userServices = require('../services/userServices.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserControllers {

    async registration(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const checking = await userServices.checking(req.body.email)
        if (checking) {
            return res.status(400).send("Данный электронный адресс существует!");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        await userServices.registration({ id: uuidv4(), ...req.body, password: hashedPassword });
        res.send("Пользователь зарегистрирован");
    }

    async login(req, res) {
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

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

        res.json({ token });

    }
}

module.exports = new UserControllers();