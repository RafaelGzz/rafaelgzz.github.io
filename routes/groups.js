const router = require('express').Router();
const { createGroup } = require('../controllers/groups_controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('users', 'Los usuarios son obligatorios').not().isEmpty(),
    validateJWT,
    validateFields
], createGroup);

module.exports = router;