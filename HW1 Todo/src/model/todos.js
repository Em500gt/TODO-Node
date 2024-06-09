const { Schema, model } = require('mongoose');

const TodosSchema = new Schema({
    title: String,
    isCompleted: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
},
    {
        versionKey: false
    }
)

const Todo = model('todos', TodosSchema);

module.exports = Todo;