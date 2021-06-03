const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    title: String,
    time_slot: String,
    days: String,
    max_students: Number,
    fee: Number,
    duration: Number,
    subscription_period: String,
    classroom_url: String,
    created_at: String,
    updated_at: String,
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    role: [ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "role"
        }
      ]
  });


module.exports = mongoose.model('permission', categorySchema);