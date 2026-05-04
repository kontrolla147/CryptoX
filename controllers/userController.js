exports.deposit = async (req, res) => {
  const { amount } = req.body

  const user = await User.findById(req.user.id)
  user.balance += Number(amount)

  await user.save()

  res.json({ message: "Deposit successful" })
}

exports.withdraw = async (req, res) => {
  const { amount } = req.body

  const user = await User.findById(req.user.id)

  if (user.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" })
  }

  user.balance -= Number(amount)
  await user.save()

  res.json({ message: "Withdraw successful" })
}