const API = window.location.origin + "/api/admin"

const token = localStorage.getItem("token")

async function loadDeposits() {
  try {
    const res = await fetch(API + "/deposits", {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    const data = await res.json()
    renderDeposits(data)

  } catch (err) {
    console.log("ERROR:", err)
  }
}

function renderDeposits(data) {
  const container = document.getElementById("depositContainer")
  container.innerHTML = ""

  data.forEach(tx => {
    container.innerHTML += `
      <tr>
       <td>${tx.username}</td>
        <td>$${tx.amount}</td>
        <td>${new Date(tx.createdAt).toLocaleString()}</td>

        <td>
          <span class="status ${tx.status}">
            ${tx.status}
          </span>
        </td>

        <td>
          <button onclick="approve('${tx._id}')">Approve</button>
          <button onclick="reject('${tx._id}')">Reject</button>
        </td>
      </tr>
    `
  })
}

// APPROVE
async function approve(id) {
  await fetch(API + `/approve-deposit/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    }
  })

  showNotify("Deposit Approved ✅")
  loadDeposits()
}

// REJECT
async function reject(id) {
  await fetch(API + `/reject-deposit/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    }
  })

  showNotify("Deposit Rejected ❌")
  loadDeposits()
}

// NOTIFY
function showNotify(msg) {
  const box = document.getElementById("notify")
  box.innerText = msg
  box.style.display = "block"

  setTimeout(() => {
    box.style.display = "none"
  }, 3000)
}
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active")
  document.querySelector(".overlay").classList.toggle("active")
}

// LOGOUT
function logout() {
  localStorage.clear()
  window.location = "login.html"
}

loadDeposits()