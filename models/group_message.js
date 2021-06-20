const { Schema, model } = require("mongoose");

const GroupMessageSchema = Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receivers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

GroupMessageSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('GroupMessage', GroupMessageSchema);