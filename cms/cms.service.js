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

    cmsAdd,


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
    if (!db.isValidId(id)) throw 'Account not found';
    const account = await db.Cms.findById(id);
    if (!account) throw 'Account not found';
    return account;
}


async function cmsAdd(params, origin) {
    // validate
    if (await db.Cms.findOne({
            Title: params.Title
        })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Cannot add same Title twice.";
    }

    // create permission object
    const cms = new db.Cms(params);


    // save account
    await cms.save();



}


async function getCms(id) {
    if (!db.isValidId(id)) throw 'Account not found';
    const cms = await db.Cms.findById(id);
    if (!cms) throw 'Not found';
    return cms;
}


async function getAll() {
    const cms = await db.Cms.find();
    return cms
}




async function update(id, params) {
    const cms = await getCms(id);

    const john = await db.Cms.findOne({
        _id: id,
        Title: params.Title
    });
    console.log(john);
    // validate (if email was changed)
    if (await db.Cms.findOne({
            _id: {
                $ne: id
            },
            Title: params.Title
        })) {
        throw 'Cms "' + params.Title + '" already exists';
    }


    // copy params to account and save
    Object.assign(cms, params);
    cms.updated_at = Date.now();
    await cms.save();

    return cms;
}