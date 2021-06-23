const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('../_helpers/role');
const settingService = require('./setting.service');
const multer = require('multer');
const db = require('../_helpers/db');
const {
    decodeBase64
} = require('bcryptjs');


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        console.log("storage definition")
        cb(null, 'C:/Users/User/Downloads/zzz/uploads/');
    },
    filename: function (req, file, cb) {
        console.log("filname definition")

        cb(null, (Date.now() + file.originalname.toString()).toString());
    }
});

const fileFilter = (req, file, cb) => {
    console.log("checking mimeType")
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}, console.log("zzzzzzzzzzzzzzzzzzzzzzzzz"));



// routes
router.get('/', getAll);
// router.post('/add', settingAddSchema, settingAdd);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);


module.exports = router;


function settingAddSchema(req, res, next) {
    const schema = Joi.object({
        company_name: Joi.string(),
        company_email: Joi.string(),
        company_phone: Joi.string(),
        company_address: Joi.string(),
        facebook_url: Joi.string(),
        twitter_url: Joi.string(),
        youtube_url: Joi.string(),
        linkedin_url: Joi.string(),
        logo: Joi.string(),
    });
    validateRequest(req, next, schema);
}

// function settingAdd(req, res, next) {
//     settingService.settingAdd(req.body, req.get('origin'))
//         .then(() => res.json({
//             message: 'Setting Added'
//         }))
//         .catch(next);
// }


function getAll(req, res, next) {
    settingService.getAll()
        .then(accounts => res.json(accounts))
        .catch(next);
}


function updateSchema(req, res, next) {
    const schemaRules = {
        company_name: Joi.string(),
        company_email: Joi.string(),
        company_phone: Joi.string(),
        company_address: Joi.string(),
        facebook_url: Joi.string(),
        twitter_url: Joi.string(),
        youtube_url: Joi.string(),
        linkedin_url: Joi.string()
    };


    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    settingService.update(req.params.id, req.body)
        .then(setting => res.json(setting))
        .catch(next);
}

function _delete(req, res, next) {
    settingService.delete(req.params.id)
        .then(() => res.json({
            message: 'Setting deleted successfully'
        }))
        .catch(next);
}


function xxxxxxx() {
    console.log("upload.array k baad")
}




router.post("/add",
    // console.log("upload.array se phle")
    upload.single('logo'), validate, (req, res, next) => {
        // const zzz = validate(req, res, next)

        // console.log
        // const set =  db.Setting.find()
        // console.log("hellooo", set)
        // if (set.length == 1) {
        //     throw {
        //         message: "Already exist"
        //     }
        // }
        // console.log("files to upload ===>", req.file)


        // const settingProp = new db.Setting({
        //     company_name: req.body.company_name,
        //     company_email: req.body.company_email,
        //     company_phone: req.body.company_phone,
        //     company_address: req.body.company_address,
        //     facebook_url: req.body.facebook_url,
        //     twitter_url: req.body.twitter_url,
        //     youtube_url: req.body.youtube_url,
        //     linkedin_url: req.body.linkedin_url,
        //     name: req.body.name,
        //     price: req.body.price,
        //     logo: req.file.path,
        // })
        // settingProp
        //     .save()
        //     .then(result => {
        //         console.log(result);
        //         res.status(201).json({
        //             message: "Created settings successfully",
        //             Settings: {
        //                 company_name: result.company_name,
        //                 company_email: result.company_email,
        //                 company_phone: result.company_phone,
        //                 company_address: result.company_address,
        //                 facebook_url: result.facebook_url,
        //                 twitter_url: result.twitter_url,
        //                 youtube_url: result.youtube_url,
        //                 linkedin_url: result.linkedin_url,
        //                 logo: result.logo,

        //             }
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(500).json({
        //             error: err
        //         });
        //     });
    });


async function validate(req, res, next) {
    settingService.settingAdd(req.body, req.file.path).then((ress) => {
        {
            if (ress === true) {
                const settingProp = new db.Setting({
                    company_name: req.body.company_name,
                    company_email: req.body.company_email,
                    company_phone: req.body.company_phone,
                    company_address: req.body.company_address,
                    facebook_url: req.body.facebook_url,
                    twitter_url: req.body.twitter_url,
                    youtube_url: req.body.youtube_url,
                    linkedin_url: req.body.linkedin_url,
                    name: req.body.name,
                    price: req.body.price,
                    logo: req.file.path,
                })
                settingProp
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Created settings successfully",
                            Settings: {
                                company_name: result.company_name,
                                company_email: result.company_email,
                                company_phone: result.company_phone,
                                company_address: result.company_address,
                                facebook_url: result.facebook_url,
                                twitter_url: result.twitter_url,
                                youtube_url: result.youtube_url,
                                linkedin_url: result.linkedin_url,
                                logo: result.logo,

                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            } else {
                res.json({
                    message: "already exist"
                })
            }
        }
    })
}