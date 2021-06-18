const router = require('express').Router();
const { getMessages } = require('../controllers/messages_controller');
const { validateJWT } = require('../middlewares/validate-jwt');


router.get('/:sender', validateJWT, getMessages);

module.exports = router;