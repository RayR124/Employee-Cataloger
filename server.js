const db = require('./db/connection');
const inquirer = require ('inquirer');
const mySQL = require('mysql2');
//const { table } = require('console');

require('dotenv').config();
db.query = utils.promisify(db.query);

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