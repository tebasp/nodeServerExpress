const { render } = require('ejs')
const path = require('path')
const connection = require('../connection')

// Sube un nivel y entra a public
const root = path.join(__dirname, '../public')

const getUsersView = (req, res) => {
    const sql = 'select * from users'

    // Para cualquier query o mutation se una la connection
    // query: query, callback
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Hubo un error en la consulta', err)
        } else {
            console.log('Query exitosa', result)
            
            // Render se configura globlemente
            // Sabe a donde ir a buscar el archivo
            // file, data
            res.render('users', { users: result })
            res.end()
        }
    })
}

const createUserView = (req, res) => {
    // Envia el archivo en si
    // nombre del archivo y su ruta
    // res.sendFile('create-user.html', { root: root })

    res.render('create-user')
}

const updateUserView = (req, res) => {
    const param = req.params.id
    const sql = 'select * from users where id=?'
    connection.query(sql, param, (err, result) => {
        if (err) {
            console.log('No se ha obtenido el usuario' + err)
        } else {
            res.render('update-user', { user: result })
        }
    })
}

const deleteUserView = (req, res) => {
    res.sendFile('delete-user.html', { root: root })
}

const createUser = (req, res) => {
    const sql = 'insert into users SET ?'
    const data = req.body

    // Query: metodo sobrecargado: query, payload, callback
    connection.query(sql, data, (err, result) => {
        if (err) {
            console.log('Hubo un error al crear el usuario')
        } else {
            console.log('Usuario agregado')

            // redireccion directa
            // xq si se llama al render hay que pasarle los datos
            // y eso ya hace users/all
            res.redirect('/users/all')
        }
    })
}

const updateUser = (req, res) => {
    const param = req.params.id
    const sql = `update users SET name='${req.body.name}', age='${req.body.age}' where id=${param}`
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Hubo un error al actualizar' + err)
        } else {
            res.redirect('/users/all')
            
        }
    })

}

const deleteUser = (req, res) => {
    const paramId = req.params.id
    users.forEach((user, index) => {
        if (user.id === paramId) {
            users.splice(index, 1)
            return
        }
    })

    res.render('users', { users })
}

module.exports = {
    getUsersView,
    createUserView,
    updateUserView,
    deleteUserView,
    createUser,
    updateUser,
    deleteUser
}

