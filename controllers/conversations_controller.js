const Conversation = require('../models/conversation');

// const createGroup = async(req, res) => {

//     try {
//         const group = await Group(req.body);
//         await group.save();
//         res.json({
//             ok: true,
//             group
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Hable con el admin'
//         });
//     }
// }

const getConversations = async(req, res) => {

    const conversations = await Conversation.find({sender: req.uid});

    res.json({
        ok: true,
        conversations
    });

}

module.exports = {
    getConversations
}