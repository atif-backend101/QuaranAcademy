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

    addStudentsToClass

};





async function classAdd(params, origin) {


    if (await db.class.findOne({ classroom_url: params.classroom_url  })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Not allowed to use this link.";
    }

    // validate
    if (await db.class.findOne({ title: params.title, teacher: params.teacher, time_slot : params.time_slot , days : params.days  })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Class already scheduled.";
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


async function addStudentsToClass(params) {

    const clas = await getClass(params.id);
    console.log("is k andar aa", clas);
    // validate
    if(clas.students.length === clas.max_students)
    {
        throw "Class full. No student can be added";
    }
    else {
        // Object.assign(clas, params.students);
        if(clas.students.includes(params.students)){
            throw "student already enrolled"
        }
        clas.students.push(params.students)

        clas.updated_at = Date.now();
        
        await clas.save();
        return clas
        
    }
}







