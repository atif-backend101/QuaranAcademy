const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Permission = new Schema({
    
    Name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
});

// Permission.virtual('isVerified').get(function () {
//     return !!(this.verified || this.passwordReset);
// });

Permission.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Permissions', Permission);