const Todo = require('../model/todos');

class TodoServices {

    async create(body) {
        const result = await new Todo(body);
        result.save();
    }

    async getTask(userId) {
        return await Todo.find({ user: userId }).populate({ path: 'user', select: '-password' })
    }

    async updateTitle(body) {
        return await Todo.findOneAndUpdate(
            {
                _id: body.id,
                user: body.userId
            },
            {
                title: body.title
            },
            {
                new: true
            }
        );
    }


    async updateIsCompleted(body) {
        const { isCompleted } = await Todo.findOne({
            _id: body.id,
            user: body.userId
        })

        await Todo.findOneAndUpdate(
            {
                _id: body.id,
                user: body.userId
            },
            {
                isCompleted: !isCompleted,
            },
            {
                new: true
            }
        )

    }

    async deleteTask(body) {
        return await Todo.findOneAndDelete(
            {
                _id: body.id,
                user: body.userId
            },
            {
                new: true
            }

        )
    }
}

module.exports = new TodoServices();