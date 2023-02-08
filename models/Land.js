const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Land = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "LandOwnerAccount",
  },
  wallet: {
      week:{
        type:Number,
        default:0
      },
      allTime:{
        type:Number,
        default:0
      }
  },
  fraction: {
    type: Number,
    required: true,
  },
  address: {
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    tehsil: {
      type: String,
      required: true,
    },
    ri: {
      type: String,
      required: true,
    },
    halkas: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    plotNo: {
      type: String,
      required: true,
    },
  },
  area: {
    type: Number,
    required: true,
  },
  vertices: [
    {
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
    },
  ],
  isRegistered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.Land || mongoose.model("Land", Land);
