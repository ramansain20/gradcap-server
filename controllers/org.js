const utilsAuth = require("../utils/auth");
const Orgaccount = require("../models/OrganisationAccount");
const jwt = require("jsonwebtoken");

exports.sendOtp = async (pan, cin) => {
  if (utilsAuth.isValidpan(pan) == false || utilsAuth.isValidcin(cin) == false)
    return { message: "In valid PAN or CIN" };
  //   const expdata = await Orgaccount.find({});
  //   console.log(expdata);
  const foundData = await Orgaccount.findOne({ pan: pan, cin: cin });
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

exports.verifyOtp = async (otp, pan) => {
  const foundData = await Orgaccount.findOne({ pan: pan });
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
