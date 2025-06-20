import React, { useEffect, useState } from 'react'

const DarkToggle = () => {

    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("prefers-color-scheme: dark").matches;
        const initial = stored || (prefersDark ? "dark" : "light");

        setTheme(initial);
        document.documentElement.classList.add(initial);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    }

  return (
    <>
    <button onClick={toggleTheme}>{theme === "dark" ? "Light" : "Dark"}</button>
    </>
  )
}

export default DarkToggle