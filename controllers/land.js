const utilsAuth = require("../utils/auth");
const land = require("../models/land");
const landOwner = require("../models/landOwnerAccount");
const jwt = require("jsonwebtoken");

exports.getLandById = async (id) => {
  const foundData = await land.findOne({ _id: id });
  if (foundData == null) {
    return { message: "Cannot find Land with this id" };
  }
  return { Data: foundData };
};

exports.getLandByOwnerId = async (id) => {
  const foundData = await landOwner.find({ OwnerId: id });
  if (foundData == null) {
    return { message: "Cannot find Land Owner" };
  }
  return { Data: foundData };
};

exports.getOwnerByLandId = async (id) => {
  const foundData = await landOwner.findOne({ _id: id });
  if (foundData == null) {
    return { message: "Cannot find Land Owner" };
  }
  return { Data: foundData.OwnerId };
};

exports.getAllResisteredLand = async () => {
  const foundData = await land.find({ isRegistered: true });
  if (foundData == null) {
    return { message: "Cannot find any Registered Land" };
  }
  return { Data: foundData };
};

exports.getOwnerRegisteredLand = async (id) => {
  const foundData = await land.find({ isRegistered: true, _id: id });
  if (foundData == null) {
    return { message: "Cannot find any Registered Land" };
  }
  return { Data: foundData };
};

exports.getOwnerVerifiedLand = async (id) => {
  const foundData = await landOwner.findOne({ isVerified: true, _id: id });
  if (foundData == null) {
    return { message: "Cannot find any Registered Land" };
  }
  let array = [];
  foundData.landId.forEach(async (element) => {
    let data = await land.findOne({ _id: element });
    array.push(data);
  });
  return { Data: foundData };
};

exports.getWalletBalance = async (id) => {
  const foundData = await land.findOne({ _id: id });
  if (foundData == null) {
    return { message: "Cannot find any wallet for this id" };
  }
  let array = [];
  foundData.landId.forEach(async (element) => {
    let data = await land.findOne({ _id: element });
    array.push(data);
  });
  return { Data: array };
};

exports.getDimensions = async (id) => {
  const foundData = await land.findOne({ _id: id });
  if (foundData == null) {
    return { message: "Cannot find any wallet for this id" };
  }
  return { Data: foundData.vertices };
};
