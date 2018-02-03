const moment = require('moment');
const _ = require('lodash');

function formatOutput(output) {
    const entries = _.values(output);
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
            tasks: []
        },
        tomorrow: {
            title: 'TOMORROW',
            tasks: []
        },
        upcoming: {
            title: 'UPCOMING',
            tasks: []
        },
        someday: {
            title: 'SOMEDAY',
            tasks: []
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
            }

            if (t.dueDate >= dayEnd && t.dueDate <= tomorrowEnd) {
                outputObj.tomorrow.tasks.push(t);
            }
        }

    });

    return formatOutput(outputObj);
}

module.exports = {
    byDate
};

// parentGlobalTaskId: null,
//     appleReminderId: null,
//     shared: false,
//     longitude: null,
//     assignedTo: 'davstepanov@gmail.com',
//     participants: [],
//     id: 'xihBUDR5DaTyOTfMznvJbw==',
//     note: null,
//     labels: null,
//     title: 'test slider',
//     status: 'UNCHECKED',
//     subTasks: [],
//     statusUpdateTime: 1517221300154,
//     labelsUpdateTime: null,
//     repeatingMethod: 'TASK_REPEAT_OFF',
//     priorityUpdateTime: 1517221300154,
//     categoryIdUpdateTime: 1517221300148,
//     categoryId: 'yM27zD08_oNS5Z2ssP55Yw==',
//     dueDate: 1517295600000,
//     latitude: null,
//     globalTaskId: 'xihBUDR5DaTyOTfMznvJbw==',
//     dueDateUpdateTime: 1517221300154,
//     alert:
// { repeatMonthType: 'ON_DATE',
//     repeatStartsOn: null,
//     offset: 0,
//     repeatEndsAfterOccurrences: -1,
//     type: 'NONE',
//     repeatEndsOn: null,
//     repeatNextOccurrence: null,
//     repeatEndType: 'REPEAT_END_NEVER',
//     repeatInterval: 1,
//     repeatDays: '0000000',
//     customTime: 0 },
// lastUpdateDate: 1517221300159,
//     creationDate: 1517221300000,
//     titleUpdateTime: 1517221300154,
//     priority: 'Normal',
//     positionUpdateTime: 1517221300154,
//     noteUpdateTime: null,
//     position: '69f2',
//     alertUpdateTime: 1517221300159,
//     assignedToUpdateTime: null },