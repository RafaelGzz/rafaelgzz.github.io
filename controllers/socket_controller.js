const User = require('../models/user');
const Message = require('../models/message');
const GroupMessage = require('../models/group_message');
const Group = require('../models/group');
const Conversation = require('../models/conversation');

const userConnected = async (uid = '') => {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;
}

const userDisconnected = async (uid = '') => {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;
}

const saveMessage = async (payload) => {
    try {
        const message = new Message(payload);
        await message.save();
        console.log(message.conversation);
        const conversation = Conversation.findById(message.conversation);
        console.log(conversation.sender);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const saveGroupMessage = async (payload) => {
    try {
        const message = new GroupMessage(payload);
        await message.save();

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    userConnected,
    userDisconnected,
    saveMessage,
    saveGroupMessage
}