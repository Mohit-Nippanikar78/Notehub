export const toggleDarkClasses = (action) => {
  if (action.payload === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
};
