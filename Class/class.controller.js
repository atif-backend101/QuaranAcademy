const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
// const authorize = require('_middleware/authorize')
const Role = require("_helpers/role");
const classService = require("./class.service");

// routes
router.get("/", getAllClasses);
router.post("/add", classAddSchema, classAdd);
// router.put("/:id", classUpdateSchema, classUpdate);
router.put("/addstudentstoclass", addStudentsToClassSchema, addStudentsToClass);

module.exports = router;

function classAddSchema(req, res, next) {
  const schema = Joi.object({
    teacher: Joi.string().required(),
    title: Joi.string().required(),
    time_slot: Joi.string().required(),
    days: Joi.string().required(),
    max_students: Joi.number().required(),
    fee: Joi.number().required(),
    duration: Joi.number().required(),
    subscription_type: Joi.string().required(),
    classroom_url: Joi.string(),
  });
  validateRequest(req, next, schema);
}

function classAdd(req, res, next) {
  classService
    .classAdd(req.body, req.get("origin"))
    .then(() => res.json({ message: "Class Added" }))
    .catch(next);
}

function getAllClasses(req, res, next) {
  classService
    .getAllClasses()
    .then((accounts) => res.json(accounts))
    .catch(next);
}

// function classUpdateSchema(req, res, next) {
//   const schemaRules = {
//     Name: Joi.string().required(),
//   };

//   const schema = Joi.object(schemaRules);
//   validateRequest(req, next, schema);
// }

// function classUpdate(req, res, next) {
//   classService
//     .update(req.params.id, req.body)
//     .then((role) => res.json(role))
//     .catch(next);
// }

function addStudentsToClassSchema(req, res, next) {
  const schemaRules = {
    id: Joi.string().required(),
    students: Joi.string().required()
  };

  const schema = Joi.object(schemaRules);
  validateRequest(req, next, schema);
}

function addStudentsToClass(req, res, next) {
  classService
    .addStudentsToClass(req.body)
    .then((accounts) => res.json(accounts))
    .catch(next);
}


