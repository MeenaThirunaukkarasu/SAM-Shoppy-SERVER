const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const addressSchema = new Schema(
  {
      address:
       [{
        contactNumber:String,
        houseNumber: String,
        street: String,
        city: String,
        postalCode: String,
        country: String,
      }],
    
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Address = model("Address", addressSchema);

module.exports = Address;
