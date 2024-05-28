const { getConnection, useDefaultDb } = require("../helpers/mongoHelpers");

class UserServices {
    #COLLECTION = "users"

    async registration(body) {
        const connection = await getConnection();
        const db = useDefaultDb(connection);
        await db.collection(this.#COLLECTION).insertOne(body);
        connection.close();
    }

    async checking(email) {
        const connection = await getConnection();
        const db = useDefaultDb(connection);
        const [result] = await db.collection(this.#COLLECTION).find({ email: email }).toArray();
        connection.close();
        return result;
    }

}

module.exports = new UserServices();