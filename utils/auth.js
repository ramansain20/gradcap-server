function isValidAadhar(aadhar) {
  let regex = new RegExp(/^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/);
  if (aadhar == null) return false;
  if (regex.test(aadhar) == true) {
    return true;
  } else {
    return false;
  }
}

function isValidPan(aadhar) {
  let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  if (aadhar == null) return false;
  if (regex.test(aadhar) == true) {
    return true;
  } else {
    return false;
  }
}

function isValidCin(aadhar) {
  let regex = new RegExp(
    /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/
  );
  if (aadhar == null) return false;
  if (regex.test(aadhar) == true) {
    return true;
  } else {
    return false;
  }
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

function sendOtp(mobileNumber, otp) {
  // Send OTP to mobileNumber
  console.log(mobileNumber, otp);
  return true;
}

module.exports.isValidAadhar = isValidAadhar;
module.exports.isValidPan = isValidPan;
module.exports.isValidCin = isValidCin;
module.exports.generateOtp = generateOtp;
module.exports.sendOtp = sendOtp;
