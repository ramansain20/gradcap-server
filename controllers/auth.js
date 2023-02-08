const utilsAuth = require("../utils/auth");
const landOwner = require("../models/landOwnerAccount");
const jwt = require("jsonwebtoken");

exports.sendOtp = async (aadhar) => {
  if (utilsAuth.isValidAadhar(aadhar) == false)
    return { message: "In valid aadhar Number" };
  const foundData = await landOwner.findOne({ aadharNumber: aadhar });
  if (foundData == null) {
    return { message: "Cannot find user" };
  }
  const otp = utilsAuth.generateOtp();
  foundData.otp = otp;
  const sent = utilsAuth.sendOtp(foundData.mobileNumber, otp);
  if (!sent) return { message: "Otp Not sent " };
  foundData.save();
  const accessToken = jwt.sign(aadhar, process.env.ACCESS_TOKEN_SECRET);
  return { message: "OTP sent", accessToken: accessToken };
};

exports.verifyOtp = async (otp, aadhar) => {
  console.log(otp, aadhar);
  const foundData = await landOwner.findOne({ aadharNumber: aadhar });
  if (foundData == null) {
    return { message: "Cannot find user" };
  }
  if (foundData.otp == otp) {
    foundData.isVerified = true;
    foundData.save();
    return { message: "OTP verified" };
  }
  return { message: "OTP not verified" };
};
