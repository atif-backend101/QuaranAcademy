const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cms = new Schema({
    
    Title: { type: String, required: true },
    Content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
});


Cms.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Cms', Cms);