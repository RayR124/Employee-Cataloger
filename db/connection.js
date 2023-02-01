const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '!RDJGlckjjd5!',
  database: 'employee_cataloger',
});

connection.connect((error) => {
  if(error){
    console.log('Error connecting to the MySQL Database');
    return;
  }
  console.log('Connection established sucessfully!');
});

connection.query("SELECT * FROM employee", (err, results) => {
    if(err) throw err
    console.table(results)
})

module.exports = connection;