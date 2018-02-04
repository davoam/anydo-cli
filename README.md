# Any.do CLI (unofficial)
This CLI allows to list and add tasks. 

## Usage
First to use CLI you have to login. CLI does not store your credentials.
It just use them to get token. 

In order to **login** you have to run the following command
```bash
ado login -e your_email -p your_password
```
**List** all tasks:
```bash
ado list # output all tasks
```
**Add** task. Task will be added to today list
```bash
ado add task_title
```