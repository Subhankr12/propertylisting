const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
    {
      location: {
          type: String,
          required: true,
      },
      price: {
        type: Number,
      },
      bhk: {
        type: Number,
        required: true,
      },
      landlordId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      },
      tenants: [{
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          name: String,
          status: {
            type: String,
            default: "Pending"
          },
      }]
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = Property = mongoose.model("Property", propertySchema);