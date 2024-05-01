const fileHelper = require('../helpers/fileHelpers.js');

class UserServices {
    async registration(body){
        const myData = await fileHelper.readFile('data.json');
        myData.users.push(body);
        await fileHelper.writeFile('data.json', myData);
    }

    async checking(email){
        return await fileHelper.checkFileByEmail('data.json', email)
    }

}

module.exports = new UserServices();