"use client";

import { useState, useEffect, createContext, ReactNode } from "react";

interface ThemeContextType {
    theme: "light" | "dark" | "system";
    setTheme: (theme: "light" | "dark" | "system") => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "system",
    setTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

type Theme = "light" | "dark" | "system";

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>("system");

    useEffect(() => {
        const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
        setTheme(savedTheme);
        applyTheme(savedTheme);

        // Listen for system theme changes if "system" is selected
        if (savedTheme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleSystemThemeChange = () => {
                applyTheme("system");
            };
            mediaQuery.addEventListener("change", handleSystemThemeChange);

            return () => {
                mediaQuery.removeEventListener("change", handleSystemThemeChange);
            };
        }
    }, []);

    const applyTheme = (selectedTheme: Theme) => {
        if (selectedTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            document.documentElement.setAttribute("data-theme", systemTheme);
        } else {
            document.documentElement.setAttribute("data-theme", selectedTheme);
        }
    };

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
}