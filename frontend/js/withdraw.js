const token = localStorage.getItem("token")

if (!token) window.location = "login.html"

async function submitWithdraw() {
  const amount = document.getElementById("amount").value
  const address = document.getElementById("address").value
  const coin = document.getElementById("coin").value

  await fetch(window.location.origin + "/api/transactions/withdraw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ amount, address, coin })
  })

  alert("Withdrawal request sent")
}
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