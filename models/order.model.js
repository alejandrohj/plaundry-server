const {Schema,model} = require('mongoose');

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  order: [
    {
      laundryId: {
        type: Schema.Types.ObjectId,
        ref: 'laundry'
      },
      quantity: Number
    }
  ],
  status: {
    type: String,
    enum: ['to pick up', 'picked up', 'washing', 'to deliver', 'delivered'],
    required: true
  },
  pickUp: {
    Date: {type: Date},
    Time: {type: String}
  },
  delivery: {
    Date: {type: Date},
    Time: {type: String}
  }
})

let OrderModel =  model('order',OrderSchema);

module.exports = OrderModel;