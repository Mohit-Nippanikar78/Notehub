import { useEffect } from "react";

export const toggleDarkClasses = (action) => {
  if (action.payload === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
};
export const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};