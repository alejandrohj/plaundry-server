const {Schema,model} = require('mongoose');

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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
    enum: ['to pick', 'picked-up', 'washing', 'to deliver', 'delivered'],
    required: true
  },
  pickUp: {
    Date: {type: Date, required: true},
    Time: {type: String, required: true}
  },
  delivery: {
    Date: {type: Date, required: true},
    Time: {type: String, required: true}
  }
})

let OrderModel =  model('order',OrderSchema);

module.exports = OrderModel;