const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_sql'
});

pool.getConnection((err, connection) => {
    err && console.log('DB connection Error', err)
    connection && console.log('DB connection Ok');
})

pool.query = promisify(pool.query)

module.exports = pool