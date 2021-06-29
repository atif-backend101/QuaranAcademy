[{
    'id': 'dasadsads',
    'attendance': [{
        'student_1': [{
            date: '17-06-2021': {
                'name': 'Khurram',
                'attendance_status': 'present',
                'timestamp': timestamp
            },
            '18-06-2021': {
                'name': 'Khurram',
                'attendance_status': 'absent',
                'timestamp': timestamp
            }
        }],
        'student_2': [{
            '17-06-2021': {
                'name': 'Khurram',
                'attendance_status': 'present',
                'timestamp': timestamp
            }
        }],
    }]
}]





























































const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('../_helpers/send-email');
const db = require('../_helpers/db');
const {
    error
} = require('console');


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
        throw "Cannot add same Attendance twice.";
    }

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
    console.log("attendace full =>>>>>>>", attendance[0].std_id);
    if (!attendance) throw 'Not found';
    var time = [];
    var std = [];
    var status = [];
    // return
    for (i = 0; i < attendance.length; i++) {

        if (time.find(x => x.attendancehasOwnProperty(`${attendance[i].date}`))) {

        }
        time.push({
            // id: id,
            attendance: [{
                [attendance[i].std_id.id]: [{
                    [attendance[i].date]: {
                        time: attendance[i].time_stamp,
                        student: attendance[i].std_id.firstName,
                        status: attendance[i].status,
                    }
                }]
            }]
        });
    };
    // for (i = 0; i < attendance.length; i++) {
    //     std.push(attendance[i].std_id);
    // };
    //     for (i = 0; i < attendance.length; i++) {
    //         status.push(attendance[i].status);
    //     };
    return time;
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