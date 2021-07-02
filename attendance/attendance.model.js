const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceMaster = new Schema({



    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    date: {
        type: String,
        required: true
    },

    std_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"
    },
    // teacher_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Teachers"
    // },
    status: {
        type: String,
        required: true
    },
    time_stamp: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date,





});


attendanceMaster.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('Attendance', attendanceMaster);