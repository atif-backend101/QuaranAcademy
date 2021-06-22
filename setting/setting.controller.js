const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('../_helpers/role');
const settingService = require('./setting.service')


// routes
router.get('/', getAll);
router.post('/add', settingAddSchema, settingAdd);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;


function settingAddSchema(req, res, next) {
    const schema = Joi.object({
        company_name: Joi.string().required(),
        company_email: Joi.string().required(),
        company_phone: Joi.string().required(),
        company_address: Joi.string().required(),
        facebook_url: Joi.string().required(),
        twitter_url: Joi.string().required(),
        youtube_url: Joi.string().required(),
        linkedin_url: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function settingAdd(req, res, next) {
    settingService.settingAdd(req.body, req.get('origin'))
        .then(() => res.json({
            message: 'Setting Added'
        }))
        .catch(next);
}


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