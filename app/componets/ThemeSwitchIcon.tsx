"use client"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitchIcon = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="ms-2 p-2 rounded-full transition-colors bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};
