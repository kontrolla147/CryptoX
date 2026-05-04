const token = localStorage.getItem("token")

if (!token) {
  window.location = "login.html"
}


async function loadTransactions() {
  const res = await fetch(window.location.origin + "/my", {
    headers: { Authorization: "Bearer " + token }
  })

  const data = await res.json()

  const container = document.getElementById("txContainer")
  container.innerHTML = ""

  data.forEach(tx => {

    const date = new Date(tx.createdAt).toLocaleDateString()

    container.innerHTML += `
      <div class="tx-row">
        <span class="type">${tx.type}</span>
        <span>$${tx.amount}</span>
        <span>${date}</span>
        <span class="status ${tx.status}">${tx.status}</span>
      </div>
    `
  })
}

loadTransactions()
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