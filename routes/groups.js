const { check } = require('express-validator');

const router = require('express').Router();
const { createGroup } = require('../controllers/groups_controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const Group = require('../models/group');


router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('users', 'Los usuarios son obligatorios').not().isEmpty(),
    validateJWT,
    validateFields
], createGroup);

router.get('/', validateJWT, async(req, res) => {

    const groups = await Group.find({}).populate('users');

    res.json({
        ok: true,
        groups
    });

});

module.exports = router;