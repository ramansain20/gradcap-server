const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Transaction = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
  senderPos: {
    type: String,
    enum: ["landOwner", "org"],
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", Transaction);
