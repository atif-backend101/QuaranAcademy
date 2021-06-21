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

    paymentAdd,


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
    const account = await db.Payment.findById(id);
    if (!account) throw 'Account not found';
    return account;
}


async function paymentAdd(params, origin) {
    // validate
    if (await db.Payment.findOne({
            student_id: params.student_id,
            class_id: params.class_id
        })) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Cannot add same payment twice.";
    }

    // create permission object
    const payment = new db.Payment(params);


    // save account
    await payment.save();



}


async function getPayment(id) {
    if (!db.isValidId(id)) throw 'Account not found';
    const payment = await db.Payment.findById(id);
    if (!payment) throw 'Not found';
    return payment;
}


async function getAll() {
    const payment = await db.Payment.find();
    return payment
}




async function update(id, params) {
    const payment = await getPayment(id);

    const john = await db.Payment.findOne({
        _id: id,
        student_id: params.student_id,
        class_id: params.class_id
    });
    // console.log(john);
    // validate (if email was changed)
    if (await db.Payment.findOne({
            _id: {
                $ne: id
            },
            student_id: params.student_id,
            class_id: params.class_id
        })) {
        const stdName = await db.Student.find({
            _id: params.student_id
        })
        const clsName = await db.class.find({
            _id: params.class_id
        }).populate("course");


        // console.log("john cena", abc)
        throw `${stdName[0].firstName} ${stdName[0].lastName}'s fees for ${clsName[0].course.Title} class is already paid`;
    }


    // copy params to account and save
    Object.assign(payment, params);
    payment.updated_at = Date.now();
    await payment.save();

    return payment;
}