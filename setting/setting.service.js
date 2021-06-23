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


async function settingAdd(params, file) {
    // validate
    var x = true
    const set = await getAll()
    console.log("service set", set)
    if (set.length > 0) {
        // send already registered error in email to prevent account enumeration
        // return await sendAlreadyRegisteredEmail(params.email, origin);
        console.log("phle se aya hai")
        x = false
    } else if (set.length == 0) {
        x = true
    }

    // // create permission object
    // const setting = new db.Setting(params);


    // // save account
    // await setting.save();

    return x



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










// router.post("/", upload.single('productImage'), (req, res, next) => {
//     const product = new Product({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         price: req.body.price,
//         productImage: req.file.path
//     });
//     product
//         .save()
//         .then(result => {
//             console.log(result);
//             res.status(201).json({
//                 message: "Created product successfully",
//                 createdProduct: {
//                     name: result.name,
//                     price: result.price,
//                     _id: result._id,
//                     request: {
//                         type: 'GET',
//                         url: "http://localhost:3000/products/" + result._id
//                     }
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });