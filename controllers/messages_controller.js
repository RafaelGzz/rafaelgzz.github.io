const Message = require('../models/message');

const getMessages = async(req, res) => {

    const me = req.uid;
    const them = req.params.sender;

    const last30 = await Message.find({
            $or: [{ sender: me, receiver: them }, { sender: them, receiver: me }]
        })
        .sort({ createdAt: 'desc' })
        .limit(30);

    res.json({
        ok: true,
        messages: last30
    });
}

module.exports = {
    getMessages
}