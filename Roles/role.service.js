const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const { error } = require('console');


// Social provider karna hai.....

module.exports = {

    roleAdd,


    getAllRoles,


    update,

};





async function roleAdd(params, origin) {
    // validate
    if (await db.role.findOne({ Name: params.Name })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Cannot add same role twice.";
    }

    // create role object
    const role = new db.role(params);


    // save account
    await role.save();



}


async function getRole(id) {
    if (!db.isValidId(id)) throw 'Account not found';
    const role = await db.role.findById(id);
    if (!role) throw 'No Role found';
    return role;
}


async function getAllRoles() {
    const role = await db.role.find();
    return role
}




async function update(id, params) {
    const role = await getRole(id);

    const john = await db.role.findOne({ _id :  id , Name: params.Name });
    console.log(john);
    // validate (if email was changed)
    if (await db.role.findOne({ _id: { $ne: id }, Name: params.Name })) {
        throw 'Role "' + params.Name + '" already exists';
    }


    // copy params to account and save
    Object.assign(role, params);
    role.updated_at = Date.now();
    await role.save();

    return role;
}







