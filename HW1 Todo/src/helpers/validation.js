const { body, param } = require('express-validator');

class Validation {

    validUser() {
        return [
            body("email").isEmail().normalizeEmail().withMessage('Email не валидный'),
            body("password").isInt()
                .isLength({ min: 6 })
                .withMessage('Пароль должен состоять только из цифр, и быть не менеее 6 символов')
        ]
    }

    validAge() {
        return body("age").custom((value) => typeof value === "number" && value > 17 && value < 100).withMessage('Возраст не соответствует (от 18 до 99)');
    }

    validName() {
        return body("name").isAlpha().trim().withMessage('Имя должно состоять только из букв');
    }

    validTodosTitle() {
        return body('title').not().isEmpty().withMessage('Текст задания отсутствует!');
    }

    validTodosIsCompleted() {
        return body("isCompleted").isBoolean().withMessage('IsCompleted -> Должен быть boolean!');
    }
}

module.exports = new Validation();