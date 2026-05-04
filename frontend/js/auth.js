const API = window.location + "/api/auth"

async function register() {
  const username = document.getElementById("username").value.trim()
  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()

  // ✅ EMAIL VALIDATION
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    alert("Enter a valid email address")
    return
  }

  // ✅ PASSWORD VALIDATION
  if (password.length < 4) {
    alert("Password must be at least 4 characters")
    return
  }

  const res = await fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })

  const data = await res.json()

  if (!res.ok) {
    alert(data.message)
    return
  }

  alert("Registration successful!")
  window.location = "login.html"
}



async function login() {
  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (!res.ok) {
    alert(data.message)
    return
  }

  localStorage.setItem("token", data.token)
  localStorage.setItem("role", data.role)

  // ✅ ADD THIS LINE
  localStorage.setItem("username", data.username)

  if (data.role === "admin") {
    window.location = "admin.html"
  } else {
    window.location = "dashboard.html"
  }
}