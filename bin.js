#!/usr/bin/env node

const program = require('commander');
const taskManager = require('./lib/taskManager');
const tokenManager = require('./lib/tokenManager');
const open = require('opn');

//
program
    .version('0.0.1');

program
    .command('add <titles...>')
    .description('Add task')
    .option('-d --due-date <dueDate>')
    .action((titles, options) => {
        let formattedTasks = titles.map(t => {
            return {
                title: t,
                dueDate: options.dueDate
            };
        });

        return taskManager.add(formattedTasks)
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

program
    .command('web')
    .description('Open web version of any.do')
    .action(() => {
        open('https://web.any.do/')
    });

program.parse(process.argv);