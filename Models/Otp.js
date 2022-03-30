const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: String,
    code: {
      type:String,
      unique:true
    },
    expireIn: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OTP", otpSchema,'otp');