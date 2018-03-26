const Api = require('anydo-api');
const formater = require('./formater');
const tokenManager = require('./tokenManager');

const api = new Api();
const readTokenPromise = tokenManager.tokenPromise.then(token => api.setToken({token}))
    .catch(err => {
        if (!process.argv.includes('login') && !process.argv.includes('web')) {
            return Promise.reject('Please login');
        }
    });

function list() {
    return readTokenPromise
        .then(() => {
            return api.sync().then((res) => {
                console.log(formater.byDate(res.models.task.items));
            });
        });
}

function add(tasks) {
    return readTokenPromise
        .then(() => {
            api.addTasks(tasks)
        });
}

module.exports = {
    list,
    add
};