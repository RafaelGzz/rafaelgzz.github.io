/**
 * PATH /api/users/
 */
const { check } = require('express-validator');
const router = require('express').Router();

const { getUsers, updateUser } = require('../controllers/users_controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', validateJWT, getUsers);
router.post('/update', [
    check('imageUrl').not().isEmpty(),
    check('imageUrl').isURL(),
    validateFields,
    validateJWT
], updateUser);

module.exports = router;