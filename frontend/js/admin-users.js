const API = window.location.origin + "/api/admin"

const token = localStorage.getItem("token")

async function loadUsers() {
  const res = await fetch(API + "/users", {
    headers: {
      Authorization: "Bearer " + token
    }
  })

  const users = await res.json()

  const tbody = document.getElementById("users")
  tbody.innerHTML = ""

  users.forEach(user => {
    tbody.innerHTML += `
      <tr>
        <td>${user.username}</td>

        <td>
          <input id="btc-${user._id}" value="${user.btcWallet || ""}">
        </td>

        <td>
          <input id="eth-${user._id}" value="${user.ethWallet || ""}">
        </td>

        <td>
          <input id="usdt-${user._id}" value="${user.usdtWallet || ""}">
        </td>

        <td>
          <button onclick="saveWallet('${user._id}')">Save</button>
        </td>
      </tr>
    `
  })
}

async function saveWallet(id) {
  const btcWallet = document.getElementById("btc-" + id).value
  const ethWallet = document.getElementById("eth-" + id).value
  const usdtWallet = document.getElementById("usdt-" + id).value

  await fetch(API + `/wallets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      btcWallet,
      ethWallet,
      usdtWallet
    })
  })

  alert("Wallet updated ✅")
}

loadUsers()
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active")
  document.querySelector(".overlay").classList.toggle("active")
}