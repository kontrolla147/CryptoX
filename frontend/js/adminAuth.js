const API = window.location.origin + "/api/auth"

async function adminLogin() {
  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (!res.ok) {
    document.getElementById("error").innerText = data.message
    return
  }

  if (data.role !== "admin") {
    document.getElementById("error").innerText = "Not admin account"
    return
  }

  localStorage.setItem("token", data.token)
  localStorage.setItem("role", data.role)

  window.location = "admin.html"
}

window.adminLogin = adminLogin