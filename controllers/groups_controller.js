const Group = require('../models/group');

const createGroup = async(req, res) => {

    try {
        const group = await Group(req.body);
        res.json({
            ok: true,
            group
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

module.exports = {
    createGroup
}