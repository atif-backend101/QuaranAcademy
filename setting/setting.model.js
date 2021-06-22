const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Setting = new Schema({

    company_name: {
        type: String,
        required: true
    },
    company_email: {
        type: String,
        required: true
    },
    company_phone: {
        type: String,
        required: true
    },
    company_address: {
        type: String,
        required: true
    },
    facebook_url: {
        type: String,
        required: true
    },
    twitter_url: {
        type: String,
        required: true
    },
    youtube_url: {
        type: String,
        required: true
    },
    linkedin_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
});


Setting.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Setting', Setting);