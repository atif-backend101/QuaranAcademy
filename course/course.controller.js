const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const Role = require('../_helpers/role');
const courseService = require('./course.service')


// routes
router.get('/', getAll);
router.post('/add', courseAddSchema, courseAdd);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;


function courseAddSchema(req, res, next) {
    const schema = Joi.object({
        Title: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function courseAdd(req, res, next) {
    courseService.courseAdd(req.body, req.get('origin'))
        .then(() => res.json({
            message: 'Course Added'
        }))
        .catch(next);
}


function getAll(req, res, next) {
    courseService.getAll()
        .then(accounts => res.json(accounts))
        .catch(next);
}


function updateSchema(req, res, next) {
    const schemaRules = {
        Title: Joi.string().required()
    };


    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    courseService.update(req.params.id, req.body)
        .then(course => res.json(course))
        .catch(next);
}

function _delete(req, res, next) {
    courseService.delete(req.params.id)
        .then(() => res.json({
            message: 'Course deleted successfully'
        }))
        .catch(next);
}