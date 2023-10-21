const { Router } = require('express');
const { login, loginGoogle, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/renew', validateJWT, renewToken);

router.post('', [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateFields
], login);
router.post('/google', [
    check('token', 'JWT is mandatory').notEmpty(),
    validateFields
], loginGoogle);

module.exports = router;