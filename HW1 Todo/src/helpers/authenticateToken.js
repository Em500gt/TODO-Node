const jwt = require('jsonwebtoken');
require('dotenv').config();
const Sentry = require("@sentry/node");

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return Sentry.captureException(res.status(401).send('Unauthorized'));
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, id) => {
            if (err) {
                return Sentry.captureException(new Error('Invalid token'));
            }
            req.userId = id.userId;
            next();
        });
    }
    catch{
        Sentry.captureException(res.status(403).send('Forbidden'));
    }
}

module.exports = authenticateToken;