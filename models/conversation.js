const { Schema, model } = require("mongoose");

const ConversationSchema = Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    type:{
        type: String,
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
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Conversation', ConversationSchema);