const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Roles = new Schema({
    
    title: { type: String, required: true },
    days: { type: String, required: true },
    max_students: { type: Number, required: true },
    fee: { type: Number, required: true },
    duration: { type: Number, required: true },
    subscription_period: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    classroom_url : { type: String, required: true },
    updated_at: Date,
    user: [ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
      ]
});



Roles.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Roles', Role);