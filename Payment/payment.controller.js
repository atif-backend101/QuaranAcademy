const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('../_helpers/role');
const paymentService = require('./payment.service')


// routes
router.get('/', getAll);
router.post('/add', paymentAddSchema, paymentAdd);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;


function paymentAddSchema(req, res, next) {
    const schema = Joi.object({
        fee: Joi.number().required(),
        discount: Joi.string(),
        discount_unit: Joi.string(),
        subscription_type: Joi.string().required(),
        student_id: Joi.string().required(),
        class_id: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function paymentAdd(req, res, next) {
    paymentService.paymentAdd(req.body, req.get('origin'))
        .then(() => res.json({
            message: 'Payment received'
        }))
        .catch(next);
}


function getAll(req, res, next) {
    paymentService.getAll()
        .then(accounts => res.json(accounts))
        .catch(next);
}


function updateSchema(req, res, next) {
    const schemaRules = {
        fee: Joi.number().required(),
        discount: Joi.string(),
        discount_unit: Joi.string(),
        subscription_type: Joi.string().required(),
        student_id: Joi.string().required(),
        class_id: Joi.string().required(),
    };


    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    paymentService.update(req.params.id, req.body)
        .then(payment => res.json(payment))
        .catch(next);
}

function _delete(req, res, next) {
    paymentService.delete(req.params.id)
        .then(() => res.json({
            message: 'Payment Method deleted successfully'
        }))
        .catch(next);
}