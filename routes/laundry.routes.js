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
        error: 'No laundry-items to show',
        message: err
      })
    })
})

router.post('/laundry/create', isLoggedIn, (req,res)=>{
  const {category,name,description,image,price} = req.body;
  if(!name) {
    res.status(500)
    .json({
      error: 'Please enter a name'
    });
  return;
  }
  if(!description) {
    res.status(500)
    .json({
      error: 'Please enter a description'
    });
  return;
  }
  if(!price) {
    res.status(500)
    .json({
      error: 'Please enter a price'
    });
  return;
  }
  if(category === 'Choose a category') {
    res.status(500)
    .json({
      error: 'Please choose a category'
    });
  return;
  }

  LaundryModel.create({category,name,description,image,price})
    .then((response)=>{
      res.status(200).json({response, message: 'Item created'})
    })
    .catch((err)=>{
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    })
})

router.get('/laundry/:id', isLoggedIn, (req,res) => {
  console.log(req.params.id)
  LaundryModel.findById(req.params.id)
    .then((result) => {
      console.log(result)
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
  if(!name) {
    res.status(500)
    .json({
      error: 'Please enter a name'
    });
  return;
  }
  if(!description) {
    res.status(500)
    .json({
      error: 'Please enter a description'
    });
  return;
  }
  if(!price) {
    res.status(500)
    .json({
      error: 'Please enter a price'
    });
  return;
  }
  if(category === 'Choose a category') {
    res.status(500)
    .json({
      error: 'Please choose a category'
    });
  return;
  }
  LaundryModel.findByIdAndUpdate(id,{$set:{category: category, name: name, description: description, image: image, price:price}})
    .then((response)=>{
      res.status(200).json({response, message: 'Changes saved'})
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