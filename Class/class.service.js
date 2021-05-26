const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const { error } = require('console');


// Social provider karna hai.....

module.exports = {

    classAdd,


    getAllClasses,


    update,

};





async function classAdd(params, origin) {
    // validate
    if (await db.class.findOne({ Name: params.Name, teacher: params.teacher })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Cannot add same class twice.";
    }

    // create role object
    const clas = new db.class(params);


    // save account
    await clas.save();



}


async function getClass(id) {
    if (!db.isValidId(id)) throw 'Class not found';
    const clas = await db.class.findById(id);
    if (!clas) throw 'No class found';
    return clas;
}


async function getAllClasses() {
    const clas = await db.class.find();
    return clas
}




async function update(id, params) {
    const clas = await getClass(id);

    const john = await db.class.findOne({ _id :  id , Name: params.Name });
    console.log(john);
    // validate (if email was changed)
    if (await db.class.findOne({ _id: { $ne: id }, Name: params.Name })) {
        throw 'Class "' + params.Name + '" already exists';
    }


    // copy params to account and save
    Object.assign(clas, params);
    clas.updated_at = Date.now();
    await clas.save();

    return clas;
}







