const API = window.location + "/api/user"

const token = localStorage.getItem("token")

if (!token) window.location = "login.html"

// LOAD WALLETS
async function loadWallets() {
  const res = await fetch(API + "/me", {
    headers: { Authorization: "Bearer " + token }
  })

  const user = await res.json()

  document.getElementById("btcWallet").innerText = user.btcWallet || "Not set"
  document.getElementById("ethWallet").innerText = user.ethWallet || "Not set"
  document.getElementById("usdtWallet").innerText = user.usdtWallet || "Not set"
}

// COPY
function copyText(id) {
  const text = document.getElementById(id).innerText
  navigator.clipboard.writeText(text)
  alert("Copied!")
}

// SUBMIT DEPOSIT
async function submitDeposit() {
  const amount = document.getElementById("amount").value

  await fetch(API + "/deposit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ amount })
  })

  alert("Deposit request submitted")
}

loadWallets()
// SIDEBAR TOGGLE (MOBILE)
// =========================
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  sidebar.classList.toggle("active")
}

// =========================
// SIDEBAR COLLAPSE (DESKTOP)
// =========================
function collapseSidebar() {
  const sidebar = document.getElementById("sidebar")
  sidebar.classList.toggle("collapsed")
}