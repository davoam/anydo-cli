# Any.do CLI (unofficial)
This CLI allows to list and add tasks.

## Installation
```bash
npm install -g ado-cli 
```

## Usage
In order to use CLI you have to login. CLI does not store your credentials.
It just uses them to get token. 

In order to **login** you have to run the following command
```bash
ado login -e your_email -p your_password
```

### List tasks 

```bash
ado list # output all tasks
```

### Add tasks

```bash
ado add task_title
```
Example:
```bash
ado add 'buy cookies'
```
It is also possible to set due date (-d is shortcut for --due-date). Possible values for due date are tomorrow, upcoming, someday.
```bash
ado add -d tomorrow 'buy more cookies'
```
Add several tasks
```bash
ado add --due-date tomorrow 'buy oreo' 'buy kitkat'
```

## All available commands

| Command        | Options           | Description  |
| ------------- |:-------------:| -----:|
| login| --email --password | Login to Any.DO account|
| list||Display all incomplete tasks|
| add|--due-date(optional, by default will be today)|Add task|
| web||Open web version of Any.DO in default browser|