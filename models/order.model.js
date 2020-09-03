const {Schema,model} = require('mongoose');

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orderItems: [
    {
      _id:false,
      laundry : {
        type: Schema.Types.ObjectId,
        ref: 'laundry'
      },
        quantityOflaundries: Number
    }
  ],
  status: {
    type: String,
    enum: ['to pick up', 'picked up', 'washing', 'to deliver', 'delivered'],
    required: true
  },
  pickUp: String,
  delivery: String,
  message: String
  },
  {
    timestamps: true
  }
)

let OrderModel =  model('order',OrderSchema);

module.exports = OrderModel;