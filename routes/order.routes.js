const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const OrderModel = require('../models/order.model');
const {isLoggedIn} = require('../helpers/auth-helper');

router.get('/orders', isLoggedIn, (req, res) => {
  console.log('looking for')
  OrderModel.find()
  .populate({
    path:'orderItems.laundry'
  })
  .populate('userId')
    .then((result) => {
      console.log('laubde', result)
      res.status(200).json(result)
    })
})

router.post('/order', (req, res) => {
  const {userId, order, pickUp, delivery} = req.body;
  let ordered = order.filter((elem)=>{
    return elem.quantity>0
  })
  let orderedItems = ordered.map((elem)=>{
    return {laundry : elem._id, quantityOflaundries: elem.quantity}
  })
  console.log(userId)
  console.log('ordQuan',orderedItems)
  OrderModel.create({userId, orderItems:orderedItems, pickUp, delivery, status: 'to pick up'})
    .then((result) => {
      res.status(200).json(result)
      console.log(result)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

router.get('/order/:id', isLoggedIn, (req,res) => {
  OrderModel.findById(req.params.id)
  .populate({
    path:'orderItems.laundry'
  })
  .populate('userId')
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

router.post('/order/:id/edit', isLoggedIn, (req, res) => {
  const {status} = req.body
  OrderModel.findByIdAndUpdate(req.params.id, {$set: {status: status}})
  .populate({
    path:'orderItems.laundry'
  })
  .populate('userId')
    .then((result) => {
      res.status(200).json(result)
      console.log('changed order')
    }).catch((err) => {
      res.status(500).json({
        error: 'Somehting went wrong order',
        message: err
      })
    });
})

// router.get('/orders/availability', (req, res) => {
  
// })

module.exports = router;