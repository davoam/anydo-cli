const fs = require('fs');
const path = require('path');
const TOKEN_FILE_PATH = path.join(__dirname, '..', 'token');
const Api = require('anydo-api');

const api = new Api();
let tokenPromise = readToken().catch(() => {});

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

function getToken(email, password) {
    tokenPromise = api
        .login({email, password})
        .then((token) => {
            saveToken(token);
            return token;
        });
    return tokenPromise;
}

module.exports = {
    readToken,
    saveToken,
    getToken,
    tokenPromise
};