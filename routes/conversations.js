const { check } = require('express-validator');

const router = require('express').Router();
const { getConversations, createConversation } = require('../controllers/conversations_controller');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post('/newConversation', [
    check('sender', 'El sender es obligatorio').not().isEmpty(),
    check('receiver', 'El receptor es obligatorio').not().isEmpty(),
    validateJWT,
    validateFields
], createConversation);

router.get('/', validateJWT, getConversations);

module.exports = router;