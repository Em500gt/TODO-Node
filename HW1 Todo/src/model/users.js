const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    age: Number
},
    {
        versionKey: false
    }
)

const User = model('users', UsersSchema);

module.exports = User;