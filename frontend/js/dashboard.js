const token = localStorage.getItem("token")

if (!token) {
  window.location = "login.html"
}


// =========================
// LOAD DASHBOARD DATA
// =========================
async function loadDashboard() {
  try {
    // GET USER
    const res = await fetch("http://localhost:5000/api/user/me", {
      headers: { Authorization: "Bearer " + token }
    })

    const user = await res.json()

    // USER INFO
    document.getElementById("username").innerText = user.username

    animateValue("balance", 0, user.balance, 800)

    // WALLETS
   // SAFE WALLET HANDLING (NO CRASH)
const btc = document.getElementById("btcWallet")
const eth = document.getElementById("ethWallet")
const usdt = document.getElementById("usdtWallet")

if (btc) btc.innerText = user.btcWallet || "Not set"
if (eth) eth.innerText = user.ethWallet || "Not set"
if (usdt) usdt.innerText = user.usdtWallet || "Not set"

    // REFERRAL LINK
    const userId = JSON.parse(atob(token.split(".")[1])).id
    const refLink = `http://localhost:5500/register.html?ref=${userId}`
    document.getElementById("refLink").value = refLink

    loadTransactions()

  } catch (err) {
    console.log("DASHBOARD ERROR:", err)
  }
}

// =========================
// LOAD TRANSACTIONS
// =========================
async function loadTransactions() {
  try {
    const res = await fetch("http://localhost:5000/api/user/transactions", {
      headers: { Authorization: "Bearer " + token }
    })

    const data = await res.json()

    const container = document.getElementById("transactions")
    container.innerHTML = ""

    let deposit = 0
    let withdraw = 0
    let pending = 0

    if (data.length === 0) {
      container.innerHTML = "<p>No transactions yet</p>"
    }

    data.forEach(tx => {

      // CALCULATIONS
      if (tx.type === "deposit" && tx.status === "approved") {
        deposit += tx.amount
      }

      if (tx.type === "withdraw" && tx.status === "approved") {
        withdraw += tx.amount
      }

      if (tx.status === "pending") {
        pending++
      }

      // TABLE
      container.innerHTML += `
      <tr>
        <td class="tx-type ${tx.type}">${tx.type}</td>
        <td>$${tx.amount}</td>
        <td><span class="status ${tx.status}">${tx.status}</span></td>
        <td class="time">${timeAgo(tx.createdAt)}</td>
      </tr>
      `
    })

    // UPDATE CARDS
    animateValue("deposit", 0, deposit, 800)
    animateValue("withdraw", 0, withdraw, 800)
    animateValue("profit", 0, deposit - withdraw, 800)

    document.getElementById("pending").innerText = pending

    // PROGRESS
    let percent = Math.min(100, Math.floor((deposit / 10000) * 100) || 10)
    document.getElementById("progressFill").style.width = percent + "%"
    document.getElementById("progressText").innerText = percent + "% completed"

  } catch (err) {
    console.log("TX ERROR:", err)
  }
}

// =========================
// DEPOSIT
// =========================
async function deposit() {
  const amount = document.getElementById("depositAmount").value

  await fetch("http://localhost:5000/api/user/deposit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ amount })
  })

  alert("Deposit request sent")
  loadDashboard()
}

// =========================
// WITHDRAW
// =========================
async function withdraw() {
  const amount = document.getElementById("withdrawAmount").value

  await fetch("http://localhost:5000/api/user/withdraw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ amount })
  })

  alert("Withdraw request sent")
  loadDashboard()
}

// =========================
// COPY WALLET
// =========================
function copyWallet(id) {
  const text = document.getElementById(id).innerText
  navigator.clipboard.writeText(text)
  alert("Copied!")
}

// =========================
// COPY REFERRAL
// =========================
function copyRef() {
  const input = document.getElementById("refLink")
  input.select()
  document.execCommand("copy")
  alert("Referral link copied!")
}

// =========================
// TIME AGO
// =========================
function timeAgo(date) {
  const now = new Date()
  const past = new Date(date)
  const seconds = Math.floor((now - past) / 1000)

  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// =========================
// ANIMATION
// =========================
function animateValue(id, start, end, duration) {
  const el = document.getElementById(id)
  let startTime = null

  function animate(time) {
    if (!startTime) startTime = time
    const progress = Math.min((time - startTime) / duration, 1)
    const value = Math.floor(progress * (end - start) + start)

    el.innerText = "$" + value

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// =========================
// NAVIGATION
// =========================
function go(page) {
  window.location = page
}
// =========================
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


// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.clear()
  window.location = "login.html"
}

// =========================
// INIT
// =========================
loadDashboard()