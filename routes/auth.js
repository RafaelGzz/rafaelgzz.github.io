/**
 * PATH: /api/auth
 */

const { check } = require('express-validator');
const router = require('express').Router();

const { newUser, login, renewToken } = require('../controllers/auth_controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post('/newUser', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email es invalido').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFields
], newUser);

router.post('/', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFields
], login);

router.get('/renew', validateJWT, renewToken);



module.exports = router;