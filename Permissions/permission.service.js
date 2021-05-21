const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const sendEmail = require('_helpers/send-email');
const db = require('_helpers/db');
const { error } = require('console');


// Social provider karna hai.....

module.exports = {

    permissionAdd,


    getAll,


    update,

};





async function permissionAdd(params, origin) {
    // validate
    if (await db.per.findOne({ Name: params.Name })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Cannot add same permission twice.";
    }

    // create permission object
    const perm = new db.per(params);


    // save account
    await perm.save();



}


async function getPermission(id) {
    if (!db.isValidId(id)) throw 'Account not found';
    const perm = await db.per.findById(id);
    if (!perm) throw 'Permission not found';
    return perm;
}


async function getAll() {
    const perm = await db.per.find();
    return perm
}




async function update(id, params) {
    const perm = await getPermission(id);

    const john = await db.per.findOne({ _id :  id , Name: params.Name });
    console.log(john);
    // validate (if email was changed)
    if (await db.per.findOne({ _id: { $ne: id }, Name: params.Name })) {
        throw 'Permission "' + params.Name + '" already exists';
    }


    // copy params to account and save
    Object.assign(perm, params);
    perm.updated_at = Date.now();
    await perm.save();

    return perm;
}







