const fileHelpers = require("../helpers/fileHelpers");

class TodoServices {
    
    async create(body) {
        const myData = await fileHelpers.readFile('data.json');
        myData.task.push(body);
        await fileHelpers.writeFile('data.json', myData);
    }
    
    async getTask(userId){
        return await fileHelpers.getMyTask('data.json', userId);
    }

    async updateTitle(body){
        const myData = await fileHelpers.readFile('data.json');
        const index = myData.task.findIndex((item) => item.id === body.id);
        if(index === -1){
            return Promise.reject();
        }

        myData.task[index].title = body.title;
        await fileHelpers.writeFile('data.json', myData);
    }

    async updateIsCompleted(idTask){
        const myData = await fileHelpers.readFile('data.json');
        const index = myData.task.findIndex((item) => item.id === idTask);
        if(index === -1){
            return Promise.reject();
        }

        myData.task[index].isCompleted = !myData.task[index].isCompleted;
        await fileHelpers.writeFile('data.json', myData);
    }

    async deleteTask(idTask){
        const myData = await fileHelpers.readFile('data.json');
        const index = myData.task.findIndex((item) => item.id === idTask);
        if(index === -1){
            return Promise.reject();
        }

        myData.task.splice(index, 1);
        await fileHelpers.writeFile('data.json', myData);
    }
    
}

module.exports = new TodoServices();