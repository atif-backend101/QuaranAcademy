const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: String,
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