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

function list(options={}) {
    return readTokenPromise
        .then(() => {
            return api.sync().then((res) => {
                if (options.doNotFormat) {
                    return res.models.task.items.filter(t => t.status === 'UNCHECKED');
                } else {
                    console.log(formater.byDate(res.models.task.items));
                }
            });
        });
}

function add(tasks) {
    return readTokenPromise
        .then(() => {
            return api.addTasks(tasks)
        });
}

function del(taskId) {
    return readTokenPromise
        .then(() => {
            return api.deleteTask({taskId})
        });
}

module.exports = {
    list,
    add,
    del
};