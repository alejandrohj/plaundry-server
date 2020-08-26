const express = require('express');
const router = express.Router();

let LaundryModel = require('../models/laundry.model');
const {isLoggedIn} = require('../helpers/auth-helper');

router.get('/laundry', (req,res)=>{
  console.log('getting')
  LaundryModel.find()
    .then((laundries)=>{
      console.log(laundries)
      res.status(200).json(laundries)
    })
    .catch((err)=>{
      res.status(500).json({
        erro: 'Something went wrong',
        message: err
      })
    })
})
router.post('/laundry/create',(req,res)=>{
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

router.post('/laundry/:id/edit',(req,res)=>{
  console.log('editing')
  let id = req.params.id;
  const {category,name,description,image,price} = req.body;
  LaundryModel.findByIdAndUpdate(id,{$set:{category: category, name: name, description: description, image: image, price:price}})
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

module.exports = router;