const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("./models/User")

mongoose.connect("mongodb+srv://Kontrolla:Rufus2020@cluster0.cdlgnms.mongodb.net/?appName=Cluster0")

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10)

  await User.create({
    username: "admin",
    email: "admin@site.com",
    password: hashedPassword,
    role: "admin"
  })

  console.log("Admin created successfully")
  process.exit()
}

createAdmin()