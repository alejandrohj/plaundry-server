const express = require('express');
const router  = express.Router();

const uploader = require('../configs/cloudinary.config.js');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {
    console.log('Image is: ', req.file)
    if (!req.file) {
      res.status(500)
        .json({
          error: 'Please select an image'
        });
      next(new Error('No image uploaded!'));
      return;
    } 
    res.json({ image: req.file.path });
})

module.exports = router;