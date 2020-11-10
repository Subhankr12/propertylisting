const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      usertype: {
        type: String,
        required: true,
      },
      wishlist: [{
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Property'
        },
        status:{
          type: String,
          default: "Pending"
        },
      }]
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = User = mongoose.model("User", userSchema);