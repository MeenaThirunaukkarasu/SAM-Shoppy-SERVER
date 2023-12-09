const { Schema, model } = require("mongoose");

const autoIncrement = require("mongoose-plugin-autoinc")


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
    orderNumber: { type: Number, required: true, unique: true },
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
orderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderNumber', // The field you want to auto-increment
  startAt: 1,            // The starting value of the counter
  incrementBy: 1,        // The increment value for each new document
});


const Order = model("Order", orderSchema);

module.exports = Order;