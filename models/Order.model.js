const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cart:{type: Schema.Types.ObjectId, ref: 'Cart', required: true },
    totalAmount: { type: Number, required: true },
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
