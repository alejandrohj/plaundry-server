const express = require('express');
const router = express.Router();

let LaundryModel = require('../models/laundry.model');
const {isLoggedIn} = require('../helpers/auth-helper');

router.get('/laundry', (req,res)=>{
  LaundryModel.find()
    .then((laundries)=>{
      res.status(200).json(laundries)
    })
    .catch((err)=>{
      res.status(500).json({
        erro: 'Something went wrong',
        message: err
      })
    })
})

router.post('/laundry/create', isLoggedIn, (req,res)=>{
  const {category,name,description,image,price} = req.body;
  LaundryModel.create({category,name,description,image,price})
    .then((response)=>{
      res.status(200).json(response)
    })
    .catch((err)=>{
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    })
})

router.get('/laundry/:id', isLoggedIn, (req,res) => {
  LaundryModel.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

router.get('/laundry/categories/:category', (req,res)=>{
  LaundryModel.find({category: req.params.category})
    .then((result)=>{
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

router.post('/laundry/:id/edit', isLoggedIn, (req,res)=>{
  let id = req.params.id;
  const {category,name,description,image,price} = req.body;
  LaundryModel.findByIdAndUpdate(id,{$set:{category: category, name: name, description: description, image: image, price:price}})
    .then((response)=>{
      res.status(200).json(response)
      console.log(category)
    })
    .catch((err)=>{
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    })
})

router.delete('/laundry/:id/delete', isLoggedIn, (req, res) => {
  LaundryModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result)      
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    })
})

module.exports = router;