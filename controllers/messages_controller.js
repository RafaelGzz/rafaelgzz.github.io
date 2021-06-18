const Message = require('../models/message');

const getMessages = async(req, res) => {

    const uid = req.uid;
    const sender = req.params.sender;

    res.json({
        ok: true,
        msg: 'mensajes'
    });
}

module.exports = {
    getMessages
}