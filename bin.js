#!/usr/bin/env node

const program = require('commander');
const taskManager = require('./lib/taskManager');
const tokenManager = require('./lib/tokenManager');

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
    .command('login')
    .description('Login into any.do')
    .option('-p --password <password>')
    .option('-e --email <email>')
    .action((options) => {
        tokenManager.getToken(options.email, options.password)
    });


program.parse(process.argv);