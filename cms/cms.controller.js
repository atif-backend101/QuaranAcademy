const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
// const authorize = require('_middleware/authorize')
const Role = require('../_helpers/role');
const cmsService = require('./cms.service')


// routes
router.get('/', getAll);
router.post('/add', cmsAddSchema, cmsAdd);
router.put('/:id', updateSchema, update);

module.exports = router;


function cmsAddSchema(req, res, next) {
    const schema = Joi.object({
        Title: Joi.string().required(),
        Content: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function cmsAdd(req, res, next) {
    cmsService.cmsAdd (req.body, req.get('origin'))
        .then(() => res.json({ message: 'Title And Content Added' }))
        .catch(next);
}


function getAll(req, res, next) {
    cmsService.getAll()
        .then(accounts => res.json(accounts))
        .catch(next);
}


function updateSchema(req, res, next) {
    const schemaRules = {
        Title: Joi.string().required(),
        Content: Joi.string().required(),
    };


    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    cmsService.update(req.params.id, req.body)
        .then(cms => res.json(cms))
        .catch(next);
}



