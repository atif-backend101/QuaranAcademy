const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: String,
    created_at: String,
    updated_at: String,
    deleted_at: String,
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    permission: [ 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission"
      }
    ]
  });


module.exports = mongoose.model('role', categorySchema);