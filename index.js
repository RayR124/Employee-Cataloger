const inquirer = require ('inquirer');
const mySQL = require('mysql2');
//const { table } = require('console');

require('dotenv').config();
db.query = utils.promisify(db.query);

const db = mySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PASS,
});

const mainTable = [
    {
        name: 'Main Table',
        type: 'list',
        message: 'some message?',
        choices: [
            'some',
            'choices',
            'here',
            '...'
        ],
    }
];