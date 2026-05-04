const API = window.location + "/api/admin"

const token = localStorage.getItem("token")

async function loadWithdrawals() {
  const res = await fetch(API + "/withdrawals", {
    headers: {
      Authorization: "Bearer " + token
    }
  })

  const data = await res.json()

  const tbody = document.getElementById("withdrawals")
  tbody.innerHTML = ""

  data.forEach(tx => {
    tbody.innerHTML += `
      <tr>
        <td>${tx.userId}</td>
        <td>$${tx.amount}</td>
        <td>${tx.walletAddress}</td>

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
  await fetch(API + `/approve-withdraw/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    }
  })

  alert("Approved ✅")
  loadWithdrawals()
}

// REJECT
async function reject(id) {
  await fetch(API + `/reject-withdraw/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    }
  })

  alert("Rejected ❌")
  loadWithdrawals()
}

loadWithdrawals()
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active")
  document.querySelector(".overlay").classList.toggle("active")
}