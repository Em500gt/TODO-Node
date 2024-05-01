const fs = require('fs');

class FileHelpers {

    readFile(nameFile) {
        return new Promise((res, rej) => {
            fs.readFile(nameFile, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    rej(err);
                }

                res(JSON.parse(data));
            })
        })
    }

    writeFile(nameFile, result) {
        return new Promise((res, rej) => {
            fs.writeFile(nameFile, JSON.stringify(result, undefined, 2), (err) => {
                if (err) {
                    console.error(err);
                    rej(err)
                }
                res();
            })
        })

    }

    checkFileByEmail(nameFile, email) {
        return new Promise((res, rej) => {
            fs.readFile(nameFile, 'utf-8', (err, data) => {
                if (err) {
                    console.error(err);
                    rej(err);
                }
                res(JSON.parse(data).users.find((item) => item.email === email));
            })
        })
    }

    getMyTask(nameFile, userId) {
        return new Promise((res, rej) => {
            fs.readFile(nameFile, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    rej(err);
                }
                res(JSON.parse(data).task.filter((item) => item.userId === userId));
            })
        })
    }
}

module.exports = new FileHelpers();