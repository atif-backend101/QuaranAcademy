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

    settingAdd,


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
    if (!db.isValidId(id)) throw 'Setting not found';
    const account = await db.Setting.findById(id);
    if (!account) throw 'Setting not found';
    return account;
}


async function settingAdd(params, origin) {
    // validate
    if (await db.Setting.findOne({
            company_name: params.company_name,
            company_email: params.company_email,
            company_phone: params.company_phone,
            company_address: params.company_address,
            facebook_url: params.facebook_url,
            twitter_url: params.twitter_url,
            youtube_url: params.youtube_url,
            linkedin_url: params.linkedin_url
        })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Cannot add same Setting twice.";
    }

    // create permission object
    const setting = new db.Setting(params);


    // save account
    await setting.save();



}


async function getSetting(id) {
    if (!db.isValidId(id)) throw 'Setting not found';
    const setting = await db.Setting.findById(id);
    if (!setting) throw 'Not found';
    return setting;
}


async function getAll() {
    const setting = await db.Setting.find();
    return setting
}




async function update(id, params) {
    const setting = await getSetting(id);

    const john = await db.Setting.findOne({
        _id: id,
        company_name: params.company_name
    });
    console.log(john);
    // validate (if email was changed)
    if (await db.Setting.findOne({
            _id: {
                $ne: id
            },
            company_name: params.company_name
        })) {
        throw 'Setting "' + params.company_name + '" already exists';
    }


    // copy params to account and save
    Object.assign(setting, params);
    setting.updated_at = Date.now();
    await setting.save();

    return setting;
}