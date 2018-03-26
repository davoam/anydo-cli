#!/usr/bin/env node

const program = require('commander');
const taskManager = require('./lib/taskManager');
const tokenManager = require('./lib/tokenManager');
const open = require('opn');
const ora = require('ora');
const inquirer = require('inquirer');

let executed = false;

//
program
    .version('0.0.1');

program
    .command('add <titles...>')
    .description('Add task(s)')
    .option('-d --due-date <dueDate>')
    .action((titles, options) => {
        onCommandFound();
        const spinner = showSpinner('Adding task');
        let formattedTasks = titles.map(t => {
            return {
                title: t,
                dueDate: options.dueDate
            };
        });

        return taskManager.add(formattedTasks)
            .then(() => {
                const text = formattedTasks.length > 1 ?
                    'Tasks were added' :
                    'Task was added';
                spinner.stopAndPersist({text});
            })
            .catch(err => spinner.fail(err));
    });

program
    .command('list')
    .description('List all tasks by date')
    .action(() => {
        onCommandFound();
        const spinner = showSpinner('Loading tasks');
        return taskManager.list()
            .then(() => {
                spinner.stop();
            })
            .catch((err) => {
                spinner.fail(err);
            })
    });

program
    .command('login')
    .description('Login into any.do')
    .option('-p --password <password>')
    .option('-e --email <email>')
    .action((options) => {
        onCommandFound();
        const spinner = showSpinner('Logging in');
        tokenManager.getToken(options.email, options.password)
            .then(() => spinner.stopAndPersist({text: 'You successfully logged in'}))
            .catch(err => spinner.fail(err));
    });

program
    .command('web')
    .description('Open web version of any.do')
    .action(() => {
        onCommandFound();
        open('https://web.any.do/', {wait: false})
    });

program
    .command('delete')
    .description('Delete selected task')
    .action(() => {
        onCommandFound();
        const spinner = showSpinner('Loading tasks');
        return taskManager.list({doNotFormat: true})
            .then((tasks) => {
                spinner.stop();
                const items = tasks.sort((a, b) => a.dueDate === null ||  a.dueDate > b.dueDate ? 1 : -1)
                    .map(t => {
                        return {
                            name: t.title,
                            value: t.id,
                            short: t.title
                        }
                    });
                inquirer.prompt({
                    type: 'list',
                    name: 'task',
                    message: 'What task to delete (select and press enter)?',
                    choices: items
                })
                .then(answers => {
                    spinner.clear().start('Deleting task');
                    return taskManager.del(answers.task);
                })
                .then(() => {
                    spinner.stop('Task was deleted');
                })
            })
            .catch((err) => {
                spinner.fail(err);
            });

    });

program.parse(process.argv);

if (!executed) {
    program.help();
}

function showSpinner(text) {
    return ora(text).start();
}

function onCommandFound() {
    executed = true;
}