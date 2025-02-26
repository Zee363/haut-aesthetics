const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

connection.query('SELECT * FROM Users', (err, results) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(results); // Output the results
});

module.exports = connection;