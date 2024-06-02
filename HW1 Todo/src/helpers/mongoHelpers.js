const MongoClient = require("mongodb").MongoClient;
const mode = require('./config');

const mongoHelper = {
    async getConnection() {
        return await MongoClient.connect(mode);
    },
    useDefaultDb(connection) {
        return connection.db(process.env.MONGO_DB_NAME);
    },
};

module.exports = mongoHelper;