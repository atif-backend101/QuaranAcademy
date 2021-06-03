// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Role = require('../models/Role');




// // ROUTE FOR READ
// router.get('/', (req, res) => {
    
//     let all_fields = [];
//     Field.find((err, docs) => {
//         all_fields = docs;
//     });
//     Register.find({}).populate('fields').exec((err, docs) => {
//         console.log(docs[10]);
//         if (err) throw err;
//         res.render('home', {
//             registers: docs,
//             fields: all_fields
//         })
//     })
// });

// router.get('/fields', (req, res) => {
//     Field.find((err, docs) => {
//         if (err) throw err;
//         res.render('field', {
//             fields: docs
//         })
//     }).catch(err => {
//         console.log(err);
//     })
// });

// // ROUTE FOR CREATE
// router.post('/add', (req, res, next) => {
//     const {
//         name,
//         email,
//         phone,
//         password,
//         field_id
//     } = req.body;
//     const register_field = new Register({
//         name,
//         email,
//         phone,
//         password,
//         fields: field_id
//     });
//     register_field.save(err => {
//         if (err) {
//             res.json(err);
//         } else {    
//             res.json('success');
//         }
//     });
// });



// router.post('/fields/add', (req, res, next) => {
//     const {
//         fieldname
//     } = req.body;
//     const field = new Field({
//         fieldname
//     });
//     field.save(err => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect('/fields');
//         }
//     });
// });


// // ROUTE TO SHOW UPDATE ELEMENT
// router.get('/edit/:id', (req, res, next) => {
//     console.log(req.params.id);
//     let all_fields = [];
//     Field.find((err, docs) => {
//         all_fields = docs;
//     });
//     Register.findOneAndUpdate({_id: req.params.id},req.body, { new: true }, (err, docs)=>{
//         res.render('edit', {register:docs,fields:all_fields});
//     })
// });


// router.get('/fields/edit/:id', (req, res, next) => {
//     console.log(req.params.id);
//     Field.findOneAndUpdate({_id: req.params.id},req.body, { new: true }, (err, docs)=>{
//         res.render('fieldedit', {field:docs});
//     })
// });


// // ROUTE TO UPDATE ELEMENT
// router.post('/edit/:id', (req, res, next) => {
//     Register.findByIdAndUpdate({_id: req.params.id},req.body, (err)=>{
//         if (err) {
//             console.log(err);
//             next(err);
//         } else {
//             res.redirect('/');
//         }
//     })
// });

// router.post('/fields/edit/:id', (req, res, next) => {
//     Field.findByIdAndUpdate({_id: req.params.id},req.body, (err)=>{
//         if (err) {
//             console.log(err);
//             next(err);
//         } else {
//             res.redirect('/fields');
//         }
//     })
// });


// router.get('/:id',(req, res)=>{
//     Register.findByIdAndDelete({_id:req.params.id}, err=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.redirect('/');
//         }
//     });
// })


// router.get('/fields/:id',(req, res)=>{
//     Field.findByIdAndDelete({_id:req.params.id}, err=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.redirect('/fields');
//         }
//     });
// })



// module.exports = router;