// Theme functions are kept here so main.js only handles the visualizer.
export function setTheme(themeToggle, isDarkTheme) {
  document.body.classList.toggle("dark", isDarkTheme);
  localStorage.setItem("sortlab-theme", isDarkTheme ? "dark" : "light");

  if (isDarkTheme) {
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
}

export function loadTheme(themeToggle) {
  const savedTheme = localStorage.getItem("sortlab-theme");
  setTheme(themeToggle, savedTheme === "dark");
}

export function toggleTheme(themeToggle) {
  const isDarkTheme = !document.body.classList.contains("dark");
  setTheme(themeToggle, isDarkTheme);
}
