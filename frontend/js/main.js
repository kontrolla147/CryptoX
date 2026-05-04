/* =========================
   NAV MENU
========================= */
function toggleMenu() {
  const nav = document.getElementById("navLinks")
  if (nav) nav.classList.toggle("active")
}

/* =========================
   HERO SLIDER (SAFE)
========================= */
const slides = document.querySelectorAll(".slide")
let slideIndex = 0

function showHeroSlide() {
  if (slides.length <= 1) return

  slides.forEach(slide => slide.classList.remove("active"))

  slideIndex = (slideIndex + 1) % slides.length
  slides[slideIndex].classList.add("active")
}

if (slides.length > 1) {
  setInterval(showHeroSlide, 4000)
}

/* =========================
   TESTIMONIALS (SAFE)
========================= */
const testimonials = document.querySelectorAll(".testimonial-card")
let index = 0

function rotateTestimonial() {
  if (testimonials.length === 0) return

  testimonials.forEach(t => t.classList.remove("active"))

  index = (index + 1) % testimonials.length
  testimonials[index].classList.add("active")
}

if (testimonials.length > 0) {
  testimonials[0].classList.add("active")
  setInterval(rotateTestimonial, 4000)
}

/* =========================
   FEATURE EXPAND (FIXED)
========================= */
document.querySelectorAll(".learn-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".feature-card")
    if (card) card.classList.toggle("active")
  })
})

/* =========================
   HERO IMAGE ANIMATION (SAFE)
========================= */
const heroImg = document.querySelector(".hero-right img")

if (heroImg) {
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      heroImg.classList.add("show")
    }, 300)
  })

  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25
    const y = (window.innerHeight / 2 - e.pageY) / 25

    heroImg.style.transform = `
      rotateY(${x}deg)
      rotateX(${y}deg)
      scale(1)
    `
  })
}

/* =========================
   HIGHLIGHT IMAGE
========================= */
const highlightImg = document.querySelector(".highlight-img img")

if (highlightImg) {
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      highlightImg.classList.add("show")
    }, 300)
  })
}

/* =========================
   LIVE CRYPTO PRICES
========================= */
function randomPrice(base) {
  return (base + (Math.random() * 100 - 50)).toFixed(2)
}

setInterval(() => {
  const btc = document.getElementById("btc")
  const eth = document.getElementById("eth")
  const xrp = document.getElementById("xrp")

  if (btc) btc.innerText = "$" + randomPrice(67000)
  if (eth) eth.innerText = "$" + randomPrice(3100)
  if (xrp) xrp.innerText = "$" + randomPrice(0.5)
}, 2000)

/* =========================
   FORM HANDLER (SAFE MULTI-FORM)
========================= */
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault()
    alert("Message sent successfully 🚀")
  })
})

/* =========================
   3D FEATURE CARD EFFECT (FIXED)
========================= */
document.querySelectorAll(".feature-card").forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = (y / rect.height - 0.5) * -10
    const rotateY = (x / rect.width - 0.5) * 10

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)"
  })

})
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", function () {

    const item = this.parentElement

    document.querySelectorAll(".faq-item").forEach(faq => {
      if (faq !== item) faq.classList.remove("active")
    })

    item.classList.toggle("active")
  })
})
const activities = [
  "🇺🇸 John invested $500",
  "🇬🇧 Sarah withdrew $1,200",
  "🇳🇬 David earned $300",
  "🇨🇦 Mike invested $800",
  "🇦🇪 Ali withdrew $2,000",
  "🇩🇪 Emma earned $450",
  "🇫🇷 Lucas invested $900",
  "🇮🇳 Raj withdrew $700"
];

const activityText = document.getElementById("activityText");

function updateActivity() {
  if (!activityText) return;

  // fade out
  activityText.classList.add("fade-out");

  setTimeout(() => {
    const random = activities[Math.floor(Math.random() * activities.length)];
    activityText.innerText = random;

    // fade in
    activityText.classList.remove("fade-out");
  }, 400);
}

// start
updateActivity();
setInterval(updateActivity, 3000);
