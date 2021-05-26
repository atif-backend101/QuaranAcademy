const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Roles = new Schema({
    
    Name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    permission: [ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "permission"
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

module.exports = mongoose.model('Roles', Roles);