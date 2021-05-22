const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    postedBy: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true,
    },
    outcome: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model('User', UserSchema)