const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
// const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const roleService = require('./role.service')


// routes
router.get('/', getAllRoles);
router.post('/add', roleAddSchema, roleAdd);
router.put('/:id', roleUpdateSchema, roleUpdate);

module.exports = router;


function roleAddSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function roleAdd(req, res, next) {
    roleService.roleAdd (req.body, req.get('origin'))
        .then(() => res.json({ message: 'Role Added' }))
        .catch(next);
}


function getAllRoles(req, res, next) {
    roleService.getAllRoles()
        .then(accounts => res.json(accounts))
        .catch(next);
}


function roleUpdateSchema(req, res, next) {
    const schemaRules = {
        Name: Joi.string().required(),
    };


    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function roleUpdate(req, res, next) {
    roleService.update(req.params.id, req.body)
        .then(role => res.json(role))
        .catch(next);
}



