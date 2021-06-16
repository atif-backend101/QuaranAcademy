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

    courseAdd,


    getAll,


    update,


    delete: _delete,
};


async function _delete(id) {
    const account = await getAccount(id);
    await account.remove();
}

// helper functions

async function getAccount(id) {
    if (!db.isValidId(id)) throw 'Course not found';
    const account = await db.Course.findById(id);
    if (!account) throw 'Course not found';
    return account;
}


async function courseAdd(params, origin) {
    // validate
    if (await db.Course.findOne({
            Title: params.Title
        })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Cannot add same Title twice.";
    }

    // create permission object
    const course = new db.Course(params);


    // save account
    await course.save();



}


async function getCourse(id) {
    if (!db.isValidId(id)) throw 'Course not found';
    const course = await db.Course.findById(id);
    if (!course) throw 'Course not found';
    return course;
}


async function getAll() {
    const course = await db.Course.find();
    return course;
}




async function update(id, params) {
    const course = await getCourse(id);

    const john = await db.Course.findOne({
        _id: id,
        Title: params.Title
    });
    // console.log(john);
    // validate (if email was changed)
    if (await db.Course.findOne({
            _id: {
                $ne: id
            },
            Title: params.Title
        })) {
        throw 'Course "' + params.Title + '" already exists';
    }


    // copy params to account and save
    Object.assign(course, params);
    course.updated_at = Date.now();
    await course.save();

    return course;
}