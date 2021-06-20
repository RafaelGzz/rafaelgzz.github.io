const { Schema, model } = require("mongoose");

const GroupSchema = Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'GroupMessage',
    }]
});

GroupSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Group', GroupSchema);