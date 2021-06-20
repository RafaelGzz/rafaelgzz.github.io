const router = require('express').Router();
const { getMessages, getGroupMessages } = require('../controllers/messages_controller');
const { validateJWT } = require('../middlewares/validate-jwt');


router.get('/:receiver', validateJWT, getMessages);
router.get('/:groupId', validateJWT, getGroupMessages);

module.exports = router;