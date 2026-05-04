const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const User = require("../models/User")
const auth = require("../middleware/authMiddleware")

// Deposit
router.post("/deposit", async (req, res) => {
  const { userId, coin, amount } = req.body

  await Transaction.create({ userId, coin, amount, type: "deposit" })

  res.json({ message: "Deposit request submitted" })
})

// Withdraw
router.post("/withdraw", async (req, res) => {
  const { userId, coin, amount } = req.body

  const user = await User.findById(userId)

  if (user.balances[coin] < amount) {
    return res.status(400).json({ message: "Insufficient balance" })
  }

  await Transaction.create({ userId, coin, amount, type: "withdraw" })

  res.json({ message: "Withdraw request submitted" })
})


router.get("/my", auth, async (req, res) => {
  const txs = await Transaction.find({ userId: req.user.id })
    .sort({ createdAt: -1 })

  res.json(txs)
})
router.get("/withdrawals", auth, async (req, res) => {
  try {
    const withdrawals = await Transaction.find({
      type: "withdraw",
      status: "pending"
    }).sort({ createdAt: -1 })

    res.json(withdrawals)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router