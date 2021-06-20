const router = require('express').Router();
const { createGroup } = require('../controllers/groups_controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post('/', validateJWT, createGroup);

module.exports = router;