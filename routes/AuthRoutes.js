const {register,  login} = require('../Controllers/Auth')
const {checkUser} = require('../Middleware/AuthMiddleware')

const router = require('express').Router()

router.post('/', checkUser)
router.post('/register', register)
router.post('/login', login)

module.exports = router