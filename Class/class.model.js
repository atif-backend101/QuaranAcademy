const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Class = new Schema({
  title: { type: String, required: true },
  time_slot: { type: String },
  days: { type: String, required: true },
  max_students: { type: Number,  required: true },
  fee: { type: Number, required: true },
  duration: { type: Number, required: true },
  subscription_type: { type: String, required: true },
  classroom_url: { type: String},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  teacher: {
    type: String,
  },
  students: [
    {
      type: String,
    },
  ],
});

Class.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

module.exports = mongoose.model("Class", Class);
