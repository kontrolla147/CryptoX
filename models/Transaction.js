const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({

  userId: { type: String, required: true },

  username: String,          
  walletAddress: String,     
  coin: String,              

  type: {
    type: String,
    enum: ["deposit", "withdraw", "admin_fund"]
  },

  amount: Number,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Transaction", transactionSchema)