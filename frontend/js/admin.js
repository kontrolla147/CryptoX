
const API = window.location + "/api/admin"

const token = localStorage.getItem("token")
const role = localStorage.getItem("role")

if (!token || role !== "admin") {
  window.location = "login.html"
}

let usersData = []

function openEdit(user) {
  editingUserId = user._id

  document.getElementById("editUsername").value = user.username
  document.getElementById("editEmail").value = user.email
  
  document.getElementById("editModal").style.display = "flex"
}

// =========================
// LOAD USERS
// =========================
async function loadUsers() {
  try {
    const res = await fetch(API + "/users", {
    headers: {
      Authorization: "Bearer " + token
    }
    })

    usersData = await res.json()

    document.getElementById("totalUsers").innerText = usersData.length

    const totalBalance = usersData.reduce(
      (sum, u) => sum + (u.balance || 0),
      0
    )

    document.getElementById("totalBalance").innerText = "$" + totalBalance

    renderUsers(usersData)
  } catch (err) {
    console.log("LOAD USERS ERROR:", err)
  }
}

// =========================
// RENDER USERS
// =========================
function renderUsers(data) {
  const tbody = document.getElementById("users")
  tbody.innerHTML = ""

  data.forEach(user => {
    tbody.innerHTML += `
      <tr>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>$${user.balance}</td>
        <td>${user.role}</td>

        <td>
          <input id="add-${user._id}" placeholder="+">
          <button onclick="addBalance('${user._id}')">Add</button>

          <input id="sub-${user._id}" placeholder="-">
          <button onclick="subBalance('${user._id}')">Remove</button>

      

          <button onclick="openEdit('${user._id}', '${user.username}', '${user.email}')">
            Edit
          </button>

          <button onclick="deleteUser('${user._id}')">
            Delete
          </button>
        </td>
      </tr>
    `
  })
}

// =========================
// SEARCH USERS
// =========================
function searchUsers() {
  const value = document.getElementById("search").value.toLowerCase()

  const filtered = usersData.filter(
    u =>
      u.username.toLowerCase().includes(value) ||
      u.email.toLowerCase().includes(value)
  )

  renderUsers(filtered)
}

// =========================
// DELETE USER
// =========================
function deleteUser(id) {
  fetch(API + `/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(() => loadUsers())
}
// =========================
// ADD BALANCE
// =========================
async function addBalance(id) {
  const amount = document.getElementById("add-" + id).value

  await fetch(API + `/balance/add/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ amount: Number(amount) })
  })

  loadUsers()
}

// =========================
// SUBTRACT BALANCE
// =========================
async function subBalance(id) {
  const amount = document.getElementById("sub-" + id).value

  await fetch(API + `/balance/subtract/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ amount: Number(amount) })
  })

  loadUsers()
}

// =========================
// UPDATE MAIN WALLET
// =========================
async function updateWallet(id) {
  const value = document.getElementById("wallet-" + id).value

  await fetch(API + `/wallets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      btcWallet: value,
      ethWallet: value,
      usdtWallet: value
    })
  })

  loadUsers()
}
// =========================
// EDIT MODAL SYSTEM
// =========================
let editingUserId = null

function openEdit(id, username, email) {
  editingUserId = id

  document.getElementById("editUsername").value = username
  document.getElementById("editEmail").value = email

  document.getElementById("editModal").style.display = "block"
  onclick='openEdit(${JSON.stringify(user)})'
}

function closeEdit() {
  document.getElementById("editModal").style.display = "none"
}

// =========================
// SAVE EDIT
// =========================
async function saveEdit() {
  const data = {
    username: document.getElementById("editUsername").value,
    email: document.getElementById("editEmail").value,

  }

  const password = document.getElementById("editPassword").value

  await fetch(API + `/user/${editingUserId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(data)
  })

  if (password) {
    await fetch(
      API + `/reset-password/${editingUserId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ password })
      }
    )
  }

  closeEdit()
  loadUsers()
}

// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.clear()
  window.location = "login.html"
}

// INIT
loadUsers()


// features
document.querySelectorAll(".learn-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("active")
  })
})
function updateUser(id) {
  fetch(API + `/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      balance: 5000,
      btcWallet: "bc1xxxxx",
      ethWallet: "0xabc...",
      usdtWallet: "Txxxx"
    })
  })
  .then(res => res.json())
  .then(data => alert("Updated"))
}
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active")
  document.querySelector(".overlay").classList.toggle("active")
}