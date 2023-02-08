const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let LandOwnerAccount = new Schema({
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  aadharNumber: {
    type: String,
    required: true,
    unique: true,
  },
  slashWallet: {
      week: {
        type: Number,
        default: 0,
      },
      allTime: {
        type: Number,
        default: 0,
      },
      current: {
        type: Number,
        default: 0,
      },
    },
  landId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Land",
    },
  ],
  isRegistered: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
    default: 1234,
  },
});

module.exports = mongoose.model("LandOwnerAccount", LandOwnerAccount);

// {"_id":{"$oid":"63da1ae43b95a3f5c0438c63"},"email":"text@text.com","mobileNumber":{"$numberLong":"6354783970"},"aadharNumber":"1234 2345 2345","slashWallet":{"$numberLong":"0"},"isRegistered":false,"isVerified":false}
