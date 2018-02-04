const moment = require('moment');
const _ = require('lodash');

function formatOutput(output) {
    const entries = _.values(output).sort((a, b) => a.order > b.order ? 1 : 0);

    return entries.reduce((outputString, entry) => {
        outputString += `\n${entry.title} (${entry.tasks.length})\n`;
        outputString += entry.tasks.map(t => `  - ${t.title}`).join('\n');

        return outputString;
    }, '');
}

function byDate(tasks) {
    const dayEnd = moment().endOf('day').valueOf();
    const tomorrowEnd = moment().add(1, 'days').endOf('day').valueOf();
    const outputObj = {
        today: {
            title: 'TODAY',
            tasks: [],
            order: 3
        },
        tomorrow: {
            title: 'TOMORROW',
            tasks: [],
            order: 2
        },
        upcoming: {
            title: 'UPCOMING',
            tasks: [],
            order: 1
        },
        someday: {
            title: 'SOMEDAY',
            tasks: [],
            order: 0
        }
    };

    tasks.forEach(t => {
        if (t.status === 'UNCHECKED') {
            if (!t.dueDate) {
                outputObj.someday.tasks.push(t);
                return;
            }

            if (t.dueDate <= dayEnd) {
                outputObj.today.tasks.push(t);
                return;
            }

            if (t.dueDate >= dayEnd && t.dueDate <= tomorrowEnd) {
                outputObj.tomorrow.tasks.push(t);
                return;
            }

            outputObj.upcoming.tasks.push(t);
        }

    });

    return formatOutput(outputObj);
}

module.exports = {
    byDate
};
