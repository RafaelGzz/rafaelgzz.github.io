/**
 * PATH /api/users/
 */

const router = require('express').Router();
const { getUsers } = require('../controllers/users_controller');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', validateJWT, getUsers);

module.exports = router;