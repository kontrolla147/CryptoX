const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddleware")
const User = require("../models/User")
const Transaction = require("../models/Transaction")


// GET USER PROFILE
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id)

  res.json({
    username: user.username,
    balance: user.balance,
    walletAddress: user.walletAddress,

    btcWallet: user.btcWallet,
    ethWallet: user.ethWallet,
    usdtWallet: user.usdtWallet
  })
})
// DEPOSIT


router.post("/deposit", auth, async (req, res) => {
  const { amount } = req.body

  await Transaction.create({
    userId: req.user.id,
    type: "deposit",
    amount: Number(amount),
    status: "pending"
  })

  res.json({ message: "Deposit submitted" })
})

// WITHDRAW
router.post("/withdraw", auth, async (req, res) => {
  const { amount } = req.body

  await Transaction.create({
    userId: req.user.id,
    type: "withdraw",
    amount: Number(amount),
    status: "pending"
  })

  res.json({ message: "Withdraw request sent" })
})

// TRANSACTIONS
router.get("/transactions/my", auth, async (req, res) => {
  const tx = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 })

  res.json(tx)
})

router.get("/transactions", auth, async (req, res) => {
  const transactions = await Transaction.find({
    userId: req.user.id
  }).sort({ createdAt: -1 })

  res.json(transactions)
})
module.exports = router