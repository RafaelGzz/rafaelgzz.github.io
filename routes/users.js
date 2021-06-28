/**
 * PATH /api/users/
 */

const router = require('express').Router();
const { getUsers, updateUser } = require('../controllers/users_controller');
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', validateJWT, getUsers);
router.post('/update', validateJWT, updateUser)

module.exports = router;