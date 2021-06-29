const Group = require('../models/group');

const createGroup = async(req, res) => {

    try {
        const group = await Group(req.body);
        await group.save();
        res.json({
            ok: true,
            group
        });

    } catch (error) { 
console.log(error);
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const getGroups = async(req, res) => {

    const groups = await Group.find({});

    res.json({
        ok: true,
        groups
    });

}

module.exports = {
    createGroup,
    getGroups
}