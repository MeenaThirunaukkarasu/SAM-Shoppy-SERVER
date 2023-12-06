const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cartDetails:[
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        size: String, 
        quantity: { type: Number, default: 1 }
          }
    ],
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true},
    status: {
      type: String,
      enum: [ 'processing', 'completed', 'cancelled'],
      default: 'processing',
    },
  },
  {
    timestamps: true,
  }
);


const Order = model("Order", orderSchema);

module.exports = Order;

