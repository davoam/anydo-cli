const fs = require('fs');
const path = require('path')
const TOKEN_FILE_PATH = path.join(__dirname, '..', 'token');

function saveToken(token) {
    fs.writeFile(TOKEN_FILE_PATH, token, () => {})
}

function readToken() {
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_FILE_PATH, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        });
    })
}

module.exports = {
    readToken,
    saveToken
};