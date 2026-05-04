const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }
    if (!email.includes("@")) {
  return res.status(400).json({ message: "Invalid email" })
}

if (password.length < 4) {
  return res.status(400).json({ message: "Password too short" })
}

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    // send token immediately
    res.json({
      token,
      role: user.role,
      username: user.username
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: "Invalid credentials" })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.json({
    token,
    role: user.role,
    username: user.username
  })
}