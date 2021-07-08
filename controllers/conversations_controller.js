const Conversation = require('../models/conversation');

const createConversation = async (req, res) => {

    try {
        const conversation = await Conversation(req.body);
        await conversation.save();
        res.json({
            ok: true,
            conversation
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

const getConversations = async (req, res) => {

    const conversations = await Conversation.find({ 
        users: req.uid 
    })
    .populate("users", ["name", "imageUrl", "online", "email", "uid"])
    .populate("messages", ["sender", "message", "updatedAt"])
    .sort({ updatedAt: 'desc' });
    res.json({
        ok: true,
        conversations
    });

}

module.exports = {
    createConversation,
    getConversations
}