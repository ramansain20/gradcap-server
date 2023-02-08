const Transaction = require("../models/Transaction");

exports.senderTrans = async (id) => {
  const foundData = await Transaction.find({ sender: id });
  if (foundData == null) {
    return { message: "Cannot find" };
  }
  return { Data: foundData };
};

exports.receiverTrans = async (id) => {
  const foundData = await Transaction.find({ receiver: id });
  if (foundData == null) {
    return { message: "Cannot find" };
  }
  return { Data: foundData };
};

exports.transLandOwner = async () => {
  const foundData = await Transaction.find({ senderPos: "LandOwner" });
  if (foundData == null) {
    return { message: "Cannot find LandOwner" };
  }
  return { Data: foundData };
};

exports.transOrg = async () => {
  const foundData = await Transaction.find({ senderPos: "org" });
  if (foundData == null) {
    return { message: "Cannot find Organization" };
  }
  return { Data: foundData };
};
