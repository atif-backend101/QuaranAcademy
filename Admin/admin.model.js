const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({

  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles"
  }],
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  passwordHash: {
    type: String
  },
  gender: String,
  dob: String,
  verificationToken: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
  deleted_at: Date,
  status: {
    type: String,
    default: "Inactive"
  },
  super: {
    type: Boolean,
    default: false
  },
  verified: Date,
  resetToken: {
    token: String,
    expires: Date
  },
  otp: {
    type: String,
  },
  verified: Date,
  passwordReset: Date,
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permissions"
  }]
});

Admin.virtual('isVerified').get(function () {
  return !!(this.verified || this.passwordReset);
});

Admin.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  }
});

module.exports = mongoose.model('Admins', Admin);