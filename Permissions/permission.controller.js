const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
// const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const permissionService = require('./permission.service')


// routes
router.get('/', getAll);
router.post('/add', permissionAddSchema, permissionAdd);
router.put('/:id', updateSchema, update);

module.exports = router;


function permissionAddSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function permissionAdd(req, res, next) {
    permissionService.permissionAdd (req.body, req.get('origin'))
        .then(() => res.json({ message: 'Permission Added' }))
        .catch(next);
}


function getAll(req, res, next) {
    permissionService.getAll()
        .then(accounts => res.json(accounts))
        .catch(next);
}


function updateSchema(req, res, next) {
    const schemaRules = {
        Name: Joi.string().required(),
    };


    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    permissionService.update(req.params.id, req.body)
        .then(perm => res.json(perm))
        .catch(next);
}



