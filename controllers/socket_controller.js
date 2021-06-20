const User = require('../models/user');
const Message = require('../models/message');
const GroupMessage = require('../models/group_message');
const Group = require('../models/group');

const userConnected = async(uid = '') => {
    const user = await User.findById(uid);
    user.online = true;
    await user.save();
    return user;
}

const userDisconnected = async(uid = '') => {
    const user = await User.findById(uid);
    user.online = false;
    await user.save();
    return user;
}

const saveMessage = async(payload) => {
    try {
        const message = new Message(payload);
        await message.save();

        return true;
    } catch (error) {
        return false;
    }
}

const saveGroupMessage = async(payload) => {
    try {
        const message = new GroupMessage(payload);
        await message.save();

        console.log(message);

        const group = new Group.findById(message.groupId).populate('messages');
        group.messages.push(message.groupId);

        console.log(group);
        await group.save();

        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    userConnected,
    userDisconnected,
    saveMessage,
    saveGroupMessage
}