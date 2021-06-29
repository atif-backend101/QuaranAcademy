const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('../_helpers/role');
const attendanceService = require('./attendance.service')


// routes
router.get('/', getAll);
router.get('/:id', getAttendanceById);
router.post('/add', attendanceAddSchema, attendanceAdd);
// router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;


function attendanceAddSchema(req, res, next) {
    const schema = Joi.object({
        date: Joi.string().required(),
        class_id: Joi.string().required(),
        std_id: Joi.string().required(),
        teacher_id: Joi.string().required(),
        status: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function attendanceAdd(req, res, next) {
    attendanceService.attendanceAdd(req.body, req.get('origin'))
        .then(() => res.json({
            message: 'Attendance Added'
        }))
        .catch(next);
}

function getAttendanceById(req, res, next) {
    attendanceService.getAttendance(req.params.id)
        .then(accounts => res.json(accounts))
        .catch(next);
}

function getAll(req, res, next) {
    attendanceService.getAll()
        .then(accounts => res.json(accounts))
        .catch(next);
}


// function updateSchema(req, res, next) {
//     const schemaRules = {
//         class_id: Joi.string().required(),
//         std_id: Joi.string().required(),
//         teacher_id: Joi.string().required(),
//         status: Joi.string().required()
//     };


//     const schema = Joi.object(schemaRules);
//     validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//     attendanceService.update(req.params.id, req.body)
//         .then(attendance => res.json(attendance))
//         .catch(next);
// }

function _delete(req, res, next) {
    attendanceService.delete(req.params.id)
        .then(() => res.json({
            message: 'Account deleted successfully'
        }))
        .catch(next);
}