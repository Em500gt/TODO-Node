require('dotenv').config();

const config = {
    check() {
        if (process.env.NODE_ENV === 'production') {
            console.log('prod');
            return process.env.MONGO_SERVER
        }

        if (process.env.NODE_ENV === 'development') {
            console.log('dev');
            return process.env.MONGO_LOCAL
        }
    }
}

module.exports = config.check();