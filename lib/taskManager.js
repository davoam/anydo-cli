const Api = require('anydo-api');
const formater = require('./formater');
const tokenManager = require('./tokenManager');

const api = new Api();
tokenManager.tokenPromise.then(token => api.setToken({token}));

function list() {
    return tokenManager.tokenPromise
        .then(() => {
            return api.sync().then((res) => {
                console.log(formater.byDate(res.models.task.items));
            });
        })
        .catch(err => console.log(err));
}

function add(title, dueDate) {
    return tokenManager.tokenPromise
        .then(() => {
            api.addTask({title})
        })
}

module.exports = {
    list,
    add
};