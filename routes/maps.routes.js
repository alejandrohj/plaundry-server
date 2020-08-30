const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get(`/adress/:query`, (req,res)=>{
  let query = req.params.query;
  console.log(query)
  axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Mo&key=AIzaSyA3pxIf9c-cF_8q885phLGfFGVO-1lPYrg`)
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

module.exports = router;