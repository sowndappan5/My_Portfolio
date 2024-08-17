const m = document.getElementById("theme-switcher"),
      a = document.getElementById("dark-theme-icon"),
      i = document.getElementById("light-theme-icon");

const h = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches,
      d = () => document.documentElement.dataset.theme === "dark",
      n = (e) => document.documentElement.dataset.theme = e;

// Toggle theme on click
m?.addEventListener("click", () => {
  const e = d() ? "light" : "dark";
  n(e);
  a?.classList.toggle("active", e === "dark");
  i?.classList.toggle("active", e === "light");
});

// Determine initial theme based on user preference or URL parameter
let c = h() ? "dark" : "light";
const t = new URLSearchParams(window.location.search).get("theme");
if (t && t === "dark") {
  c = "dark";
} else if (t && t === "light") {
  c = "light";
}

// Apply initial theme
n(c);

// Update icon states based on initial theme
a?.classList.toggle("active", c === "dark");
i?.classList.toggle("active", c === "light");