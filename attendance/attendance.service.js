const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('../_helpers/send-email');
const db = require('../_helpers/db');
const {
    error
} = require('console');
const {
    result
} = require('lodash');


// Social provider karna hai.....

module.exports = {

    attendanceAdd,

    getAttendance,


    getAll,


    // update,


    delete: _delete,
};


async function _delete(id) {
    const account = await getAccount(id);
    await account.remove();
}

// helper functions

async function getAccount(id) {
    if (!db.isValidId(id)) throw 'Account not found';
    const account = await db.Attendance.findById(id);
    if (!account) throw 'Account not found';
    return account;
}


async function attendanceAdd(params, origin) {
    // validate
    if (await db.Attendance.findOne({
            date: params.date,
            class_id: params.class_id,
            std_id: params.std_id
        })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Cannot add Attendance twice for same day.";
    }

    const checkClass = await db.class.findOne({
        _id: params.class_id
    })

    if (!checkClass) throw 'No Class Exist';

    const checkStudent = await db.class.findOne({
        _id: params.class_id,
        students: params.std_id
    })

    if (!checkStudent) throw 'Student is not enrolled in this class';

    // create permission object
    const attendance = new db.Attendance(params);


    // save account
    await attendance.save();



}


async function getAttendance(id) {
    if (!db.isValidId(id)) throw 'Account not found';
    const attendance = await db.Attendance.find({
        class_id: id
    }).populate("std_id");
    if (!attendance) throw 'Not found';
    var time = [];
    // return
    for (i = 0; i < attendance.length; i++) {

        time.push({

            student_id: attendance[i].std_id.id,
            date: attendance[i].date,
            student: attendance[i].std_id.firstName,
            status: attendance[i].status,
            time: attendance[i].time_stamp,

        });
    };


    var result = time.reduce(function (r, a) {
        r[a.student_id] = r[a.student_id] || [];
        r[a.student_id].push(a);
        return r;
    }, Object.create(null));

    for (i in result) {
        for (j = 0; j < result[i].length; j++) {
            delete result[i][j].student_id
        }

    }
    return {
        class_id: id,
        attendance: result
    };
}


async function getAll() {
    const attendance = await db.Attendance.find();
    return attendance
}




// async function update(id, params) {
//     const attendance = await getAttendance(id);

//     const john = await db.Attendance.findOne({
//         _id: id,
//         class_id: params.class_id,
//         std_id: params.std_id,
//         teacher_id: params.teacher_id,
//         status: params.status
//     });
//     console.log(john);
//     // validate (if email was changed)
//     if (await db.Attendance.findOne({
//             _id: {
//                 $ne: id
//             },
//             class_id: params.class_id,
//             std_id: params.std_id,
//             teacher_id: params.teacher_id,
//         })) {
//         throw 'Attendance of "' + params.std_id + '" already marked';
//     }


//     // copy params to account and save
//     Object.assign(attendance, params);
//     attendance.updated_at = Date.now();
//     await attendance.save();

//     return attendance;
// }