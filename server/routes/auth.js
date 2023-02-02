const { login, register, auth } = require('../controllers/auth')
const { check } = require('express-validator')
const verifyAuth = require('../middlewares/verifyAuth')
const router = require('express').Router()


router.get('/', verifyAuth, auth)

router.post(
    '/login',
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must contain minimum 6 characters').isLength({ min: 6 })
    ],
    login
)

router.post(
    '/register',
    [
        check('name', 'Name is required').exists(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must contain minimum 6 characters').isLength({ min: 6 })
    ],
    register
)




module.exports = router