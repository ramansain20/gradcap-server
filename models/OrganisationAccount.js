const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let OrganisationAccount = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  panNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cinNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  carbonCredits: {
    type: Number,
    default: 0,
  },
  otp: {
    type: Number,
  },
  report: {
    // carbonGenerated: {
    //     type: Number,
    // },
    // carbonReduced: {
    //     type: Number,
    // },
  },
});

module.exports = mongoose.model("OrganisationAccount", OrganisationAccount);
