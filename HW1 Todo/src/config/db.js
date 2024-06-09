const mongoose = require('mongoose');
const mode = require('../helpers/config');

const MONGO_URL = `${mode}${process.env.MONGO_DB_NAME}`

async function connectDb() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Connect to database');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;