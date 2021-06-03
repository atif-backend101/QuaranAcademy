const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    // product_id: String,
    // category_id: String

    role: [ 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
      }
    ],
    first_name: String,
    last_name: String,
    email: String,
    mobile: String, 
    password:  String,
    gender: String,
    dob: String,
    otp: String,
    created_at: String,
    updated_at: String,
    deleted_at: String,
    status: String, 
    social_provider : String,
    provider_token : String,

    permission: [ 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission"
      }
    ],

  });


module.exports = mongoose.model('user', categorySchema);