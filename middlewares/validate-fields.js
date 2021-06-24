const { validationResult } = require('express-validator')

const validateFields = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {

        console.log(err);
        return res.status(400).json({
            ok: false,
            msg: err.mapped()
        });
    }
    next();
}

module.exports = {
    validateFields
}