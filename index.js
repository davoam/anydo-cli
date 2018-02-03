const program = require('commander');
const taskManager = require('./lib/taskManager');
//
program
    .version('0.0.1');

program
    .command('add <title>')
    .description('Add task')
    .action((title) => {
        return taskManager.add(title)
            .catch(err => console.log(err));
    });

program
    .command('list')
    .description('List all tasks by date')
    .action(() => {
        return taskManager.list();
    });

program
    .command('login', 'Login into any.do')
    .option('-p --password <password>')
    .option('-e --email <email>')
    .action((cmd) => {
        tokenManager.getToken(cmd.email, cmd.password)
    });


program.parse(process.argv);