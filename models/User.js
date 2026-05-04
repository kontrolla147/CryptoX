const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,

  balance: { type: Number, default: 0 },

  walletAddress: { type: String, default: "" },
  btcWallet: { type: String, default: "" },
  ethWallet: { type: String, default: "" },
  usdtWallet: { type: String, default: "" },

  role: { type: String, default: "user" }
})

module.exports = mongoose.model("User", userSchema)