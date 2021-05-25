const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    class_ids: [ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "class"
        }
      ],
      role_ids: [ 
        {
          type: String
        }
      ],
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String},
    mobile: { type: String}, 
    passwordHash: { type: String },
    gender: String,
    dob: String,
    verificationToken: String,
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    deleted_at: Date,
    status: { type: String, default: "Inactive" }, 
    social_provider : [ 
      {
        type: String,
      }
    ], 
    provider_id : [ 
      {
        type: String,
      }
    ],
    verified: Date,
    resetToken: {
        token: String,
        expires: Date
    },
    otp: { type: String, },
    verified: Date,
    passwordReset: Date,

});

User.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

User.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Users', User);