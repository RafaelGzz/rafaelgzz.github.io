const User = require('../models/user');

const getUsers = async(req, res) => {

    const from = Number(req.query.from) || 0;

    const users = await User
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(from);

    res.json({
        ok: true,
        users
    });

}

const updateUser = async(req, res) => {
    const success = await User.findByIdAndUpdate(req.uid, { imageUrl: req.imageUrl })

    res.json({
        ok: success,
    })
}

module.exports = {
    getUsers,
    updateUser
}