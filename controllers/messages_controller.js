const Message = require('../models/message');
const GroupMessage = require('../models/group_message');

const getMessages = async(req, res) => {

    const me = req.uid;
    const them = req.params.receiver;

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

const getGroupMessages = async(req, res) => {
    const me = req.uid;
    const them = req.params.groupId;

    const last30 = await GroupMessage.find({
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
    getMessages,
    getGroupMessages
}