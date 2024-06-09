const User = require('../model/users')
class UserServices {

    async registration(body) {
        const result = await new User(body);
        result.save();
    }

    async checking(email) {
        return await User.findOne({email: email});
    }
}

module.exports = new UserServices();