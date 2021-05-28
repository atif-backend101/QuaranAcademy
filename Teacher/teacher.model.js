const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teacher = new Schema({
    class_ids: [ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "class"
        }
      ],
      role_ids: 
        {
          type: String,
          default: "Teacher"
        },
    firstName: { type: String },
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

Teacher.virtual('isVerified').get(function () {
    return !!(this.verified || this.passwordReset);
});

Teacher.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Teachers', Teacher);