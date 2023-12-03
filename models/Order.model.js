const { Schema, model } = require("mongoose");
const autoIncrement = require('../middleware/autoIncrementMiddleware'); 

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cart:{type: Schema.Types.ObjectId, ref: 'Cart', required: true },
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

// orderSchema.pre('save', autoIncrement.bind(null, 'Order'));

// const YourModel = mongoose.model('YourModel', yourSchema);

const Order = model("Order", orderSchema);

module.exports = Order;
