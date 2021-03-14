const mysql = require('mysql')
const { mysql_database } = require('./config')

// Crear una conexion
const connection = mysql.createConnection(mysql_database)

// Conexion efectiva
connection.connect((err, conn) => {
    if (err) {
        console.log('Hubo un error al conectar a la DB')
    } else {
        console.log('Conexion a la DB exitosa')
        return conn
    }
} )

module.exports = connection