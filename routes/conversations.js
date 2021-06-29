const { check } = require('express-validator');

const router = require('express').Router();
const { getConversations } = require('../controllers/conversations_controller');
const { validateJWT } = require('../middlewares/validate-jwt');


// router.post('/', [
//     check('name', 'El nombre es obligatorio').not().isEmpty(),
//     check('users', 'Los usuarios son obligatorios').not().isEmpty(),
//     validateJWT,
//     validateFields
// ], createGroup);

router.get('/', validateJWT, getConversations);

module.exports = router;