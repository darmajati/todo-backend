const router = require('express').Router()
const authController = require ('../controller/authController')

router.post('/api/login', authController.login)
router.post('/api/register', authController.register)


module.exports = router