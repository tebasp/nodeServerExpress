const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router.get('/all', userController.getUsersView)

router.get('/create', userController.createUserView)

router.get('/update/:id', userController.updateUserView)

router.get('/delete/:id', userController.deleteUserView)

router.post('/create', userController.createUser)

router.post('/update/:id', userController.updateUser)

//Enviar parametros por uri, :id 
router.post('/delete/:id', userController.deleteUser)

module.exports = router