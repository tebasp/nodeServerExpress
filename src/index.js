const express = require('express')
const app = express()
const path = require('path')
const connection = require('./connection')

const port = 3000

const users = require('./routes/users')
const loggedInMiddleware = require('./middlewares/logged')

// settings
app.set('title', 'Node app')

// Global Config EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(loggedInMiddleware.isLogged)

// path: alias for routes
// path.join: normalize path
app.use(express.static(path.join(__dirname, 'public')))

// Decodifica el req.body para mostar en consola
app.use(express.urlencoded({ extended: false }))

// Main route
app.get('/', (req, res) => {
    res.send('Server is running')
})

// Routes
app.use('/users', users)

app.listen(port, () => { console.log(`App is running in port ${port} ${app.get('title')}` )})