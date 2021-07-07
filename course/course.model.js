const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({

    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Certifications: {
        type: String,
        required: true
    },
    Outcomes: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
});


Course.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Course', Course);