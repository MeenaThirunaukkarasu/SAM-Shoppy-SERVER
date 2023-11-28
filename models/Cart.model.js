const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User' },

cartDetails: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      size: String, 
      quantity: { type: Number, default: 1 }
        }
  ],
},
{
    timestamps: true,
}
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;