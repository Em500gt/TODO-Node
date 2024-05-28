const { getConnection, useDefaultDb } = require("../helpers/mongoHelpers");
const { ObjectId } = require('mongodb');

class TodoServices {
    #COLLECTION = "todos"

    async create(body) {
        const connection = await getConnection();
        const db = await useDefaultDb(connection);
        await db.collection(this.#COLLECTION).insertOne(body);
        connection.close();
    }

    async getTask(userId) {
        const connection = await getConnection();
        const db = useDefaultDb(connection);
        const result = await db.collection(this.#COLLECTION).aggregate([{ $match: { userId } }]).toArray();
        connection.close()
        return result
    }

    async updateTitle(body) {
        const connection = await getConnection();
        const db = useDefaultDb(connection);
        await db.collection(this.#COLLECTION).updateOne({ _id: new ObjectId(body.id) }, { $set: { title: body.title } })
        connection.close();
    }

    async updateIsCompleted(idTask) {
        const connection = await getConnection();
        const db = useDefaultDb(connection);
        const searchCompeted = await db.collection(this.#COLLECTION).findOne({ _id: new ObjectId(idTask) });
        await db.collection(this.#COLLECTION).updateOne({ _id: new ObjectId(idTask) }, { $set: { isCompleted: !searchCompeted.isCompleted } })
        connection.close();
    }

    async deleteTask(idTask) {
        const connection = await getConnection();
        const db = useDefaultDb(connection);
        await db.collection(this.#COLLECTION).deleteOne({ _id: new ObjectId(idTask) });
        connection.close();
    }
}

module.exports = new TodoServices();