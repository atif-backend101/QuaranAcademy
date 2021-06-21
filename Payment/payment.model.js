const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payment = new Schema({

    fee: {
        type: Number,
        required: true
    },
    discount: {
        type: String,
        required: false
    },
    discount_unit: {
        type: String,
        required: false
    },
    subscription_type: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
});


Payment.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Payment', Payment);