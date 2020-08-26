const {Schema, model} = require('mongoose');

const LaundrySchema = new Schema({
  category :{
    type: String,
    enum: ['clothing', 'bedding', 'towels', 'business', 'bags'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  price: {
    type: Number,
    required: true
  }
})

let LaundryModel =  model('laundry', LaundrySchema);

module.exports = LaundryModel;