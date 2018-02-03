const Api = require('../anydo-api');
const program = require('commander');
const tokenManager = require('./lib/tokenManager');
const formater = require('./lib/formater');

const api = new Api();
let tokenPromise = tokenManager.readToken()
    .then((token) => api.setToken(token));

program
    .version('0.0.1')
    .command('add <name>', 'Add task to list')
    .action((cmd) => {
        console.log('name', cmd.name)
    });

program
    .command('list')
    .action(() => {
        return tokenPromise
            .then(() => {
                api.sync().then((res) => {
                    console.log(formater.byDate(res.models.task.items));
                });
            });
    });

program
    .command('login')
    .option('-p --password <password>')
    .option('-e --email <email>')
    .action((cmd) => {
        tokenPromise = api
            .login({
                email: cmd.email,
                password: cmd.password
            })
            .then((token) => {
                tokenManager.saveToken(token);
                return token;
            })
    });


program.parse(process.argv);