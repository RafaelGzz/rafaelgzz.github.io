const { check } = require('express-validator');

const router = require('express').Router();
const { getConversations, createConversation } = require('../controllers/conversations_controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post('/newConversation', [
    check('users', 'Los usuarios son obligatorios').not().isEmpty(),
    validateJWT,
    validateFields
], createConversation);

router.get('/', validateJWT, getConversations);

module.exports = router;