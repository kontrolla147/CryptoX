const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const User = require("../models/User")
const auth = require("../middleware/authMiddleware")

// Deposit
router.post("/deposit", auth, async (req, res) => {

  const { amount, coin } = req.body

  const user = await User.findById(req.user.id)

  await Transaction.create({
    userId: req.user.id,
    username: user.username,
    coin,
    amount: Number(amount),
    type: "deposit",
    status: "pending"
  })

  res.json({
    message: "Deposit request submitted"
  })

})

// Withdraw
router.post("/withdraw", auth, async (req, res) => {
  const { amount, coin, walletAddress } = req.body

  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  if (!user.balance || user.balance[coin] < amount) {
    return res.status(400).json({ message: "Insufficient balance" })
  }

  await Transaction.create({
    userId: req.user.id,
     username: user.username,
    coin,
    amount: Number(amount),
    walletAddress,
    type: "withdraw",
    status: "pending"
  })

  res.json({ message: "Withdraw request submitted" })
})


router.get("/my", auth, async (req, res) => {
  const txs = await Transaction.find({ userId: req.user.id })
    .sort({ createdAt: -1 })

  res.json(txs)
})

router.get("/withdrawals", auth, async (req, res) => {
  const withdrawals = await Transaction.find({
    type: "withdraw",
    status: "pending"
  }).sort({ createdAt: -1 })

  res.json(withdrawals)
})

module.exports = router