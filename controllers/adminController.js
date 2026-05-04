const User = require("../models/User")

// Get all users
exports.getUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    await User.findByIdAndDelete(id)

    res.json({ message: "User deleted" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update balance
exports.updateBalance = async (req, res) => {
  const { amount } = req.body

  const user = await User.findById(req.params.id)
  user.balance += amount

  await user.save()

  res.json({ message: "Balance updated" })
}

// Set wallet
exports.setWallet = async (req, res) => {
  const { wallet } = req.body

  const user = await User.findByIdAndUpdate(req.params.id, {
    walletAddress: wallet
  })

  res.json({ message: "Wallet updated" })
}
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { balance, btcWallet, ethWallet, usdtWallet } = req.body

    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: "User not found" })

    if (balance !== undefined) user.balance = balance
    if (btcWallet !== undefined) user.btcWallet = btcWallet
    if (ethWallet !== undefined) user.ethWallet = ethWallet
    if (usdtWallet !== undefined) user.usdtWallet = usdtWallet

    await user.save()

    res.json({ message: "User updated", user })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}