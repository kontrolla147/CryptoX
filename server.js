
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const connectDB = require("./config")

dotenv.config()

const app = express()

// Connect DB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes (FIXED PATHS)
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))
app.use("/api/transactions", require("./routes/transactionRoutes"))

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")))

// Start server
const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(` Server running on port ${PORT}`))


app.get("/", (req, res) => {

  res.send("API running")

})
