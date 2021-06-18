const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
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
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

MessageSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Message', MessageSchema);