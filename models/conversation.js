const { Schema, model } = require("mongoose");

const ConversationSchema = Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: false
    }]
}, {
    timestamps: true
});

ConversationSchema.method('toJSON', function() {
    const { __v, _id, createdAt, updatedAt, ...object } = this.toObject();
    return object;
});

module.exports = model('Conversation', ConversationSchema);