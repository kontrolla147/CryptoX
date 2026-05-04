const router = require("express").Router()
const auth = require("../middleware/authMiddleware")
const isAdmin = require("../middleware/adminMiddleware")

const User = require("../models/User")
const Transaction = require("../models/Transaction")

// =========================
// 👤 GET USERS
// =========================
router.get("/users", auth, isAdmin, async (req, res) => {
  const users = await User.find()
  res.json(users)
})

// =========================
// ❌ DELETE USER
// =========================
router.delete("/user/:id", auth, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: "User deleted" })
})

// =========================
// ✏️ UPDATE USER (name/email)
// =========================
router.put("/user/:id", auth, isAdmin, async (req, res) => {
  const { username, email } = req.body

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, email },
    { new: true }
  )

  res.json(user)
})

// =========================
// 💰 ADD BALANCE
// =========================
router.put("/balance/add/:id", auth, isAdmin, async (req, res) => {
  const { amount } = req.body

  const user = await User.findById(req.params.id)

  user.balance += Number(amount)
  await user.save()

  res.json({ message: "Balance added" })
})

// =========================
// 💸 SUBTRACT BALANCE
// =========================
router.put("/balance/subtract/:id", auth, isAdmin, async (req, res) => {
  const { amount } = req.body

  const user = await User.findById(req.params.id)

  user.balance -= Number(amount)
  await user.save()

  res.json({ message: "Balance removed" })
})

// =========================
// 💳 UPDATE WALLET
// =========================
router.put("/wallets/:id", auth, isAdmin, async (req, res) => {
  const { btcWallet, ethWallet, usdtWallet } = req.body

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { btcWallet, ethWallet, usdtWallet },
    { new: true }
  )

  res.json({ message: "Wallet updated", user })
})

router.get("/deposits", auth, isAdmin, async (req, res) => {
  const deposits = await Transaction.find({
    type: "deposit",
    status: "pending"
  }).sort({ createdAt: -1 })

  res.json(deposits)
})

router.put("/approve-deposit/:id", auth, isAdmin, async (req, res) => {
  const tx = await Transaction.findById(req.params.id)

  if (!tx || tx.status !== "pending") {
    return res.status(400).json({ message: "Invalid deposit" })
  }

  const user = await User.findById(tx.userId)

  user.balance += tx.amount
  await user.save()

  tx.status = "approved"
  await tx.save()

  res.json({ message: "Deposit approved" })
})


router.put("/reject-deposit/:id", auth, isAdmin, async (req, res) => {
  const tx = await Transaction.findById(req.params.id)

  if (!tx || tx.status !== "pending") {
    return res.status(400).json({ message: "Invalid deposit" })
  }

  tx.status = "rejected"
  await tx.save()

  res.json({ message: "Deposit rejected" })
})
router.put("/approve-withdraw/:id", auth, isAdmin, async (req, res) => {
  const tx = await Transaction.findById(req.params.id)

  if (!tx || tx.status !== "pending") {
    return res.status(400).json({ message: "Invalid withdrawal" })
  }

  const user = await User.findById(tx.userId)

  if (user.balance < tx.amount) {
    return res.status(400).json({ message: "Insufficient balance" })
  }

  user.balance -= tx.amount
  await user.save()

  tx.status = "approved"
  await tx.save()

  res.json({ message: "Withdrawal approved" })
})

router.put("/reject-withdraw/:id", auth, isAdmin, async (req, res) => {
  const tx = await Transaction.findById(req.params.id)

  if (!tx || tx.status !== "pending") {
    return res.status(400).json({ message: "Invalid withdrawal" })
  }

  tx.status = "rejected"
  await tx.save()

  res.json({ message: "Withdrawal rejected" })
})

router.get("/withdrawals", auth, isAdmin, async (req, res) => {
  const withdrawals = await Transaction.find({
    type: "withdraw",
    status: "pending"
  })
  .populate("userId", "username btcWallet ethWallet usdtWallet email")
  .sort({ createdAt: -1 })

  res.json(withdrawals)
})


module.exports = router