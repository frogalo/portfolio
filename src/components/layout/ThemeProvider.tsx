"use client";

import { useState, useEffect, createContext, ReactNode, useContext } from "react";

interface ThemeContextType {
    theme: "light" | "dark" | "system";
    setTheme: (theme: "light" | "dark" | "system") => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "system",
    setTheme: () => {},
});

// Hook to access theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

type Theme = "light" | "dark" | "system";

export default function ThemeProvider({ children }: ThemeProviderProps) {
    // Initialize state to 'system' by default.
    // The actual theme will be determined and applied in useEffect.
    const [theme, setThemeState] = useState<Theme>("system");

    const applyThemeToElement = (themeToApply: Theme) => {
        if (themeToApply === "system") {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', systemPrefersDark);
        } else {
            document.documentElement.setAttribute('data-theme', themeToApply);
            document.documentElement.classList.toggle('dark', themeToApply === 'dark');
        }
    };

    // Effect to handle initial theme setting and system preference listeners
    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates after unmount

        const initializeTheme = () => {
            if (typeof window === 'undefined') return; // Guard for server-side

            const savedTheme = localStorage.getItem('theme');
            let initialTheme: Theme;

            if (savedTheme) {
                initialTheme = savedTheme as Theme;
            } else {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                initialTheme = systemPrefersDark ? 'dark' : 'light';
            }

            // Set the internal state
            if (isMounted) {
                setThemeState(initialTheme);
            }

            // Apply the theme to the HTML element
            applyThemeToElement(initialTheme);

            // Add listener for system theme changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleSystemThemeChange = () => {
                if (initialTheme === 'system' && isMounted) { // Re-apply only if current setting is 'system'
                    const systemPrefersDark = mediaQuery.matches;
                    applyThemeToElement(systemPrefersDark ? 'dark' : 'light');
                }
            };

            mediaQuery.addEventListener('change', handleSystemThemeChange);

            return () => {
                mediaQuery.removeEventListener('change', handleSystemThemeChange);
                isMounted = false; // Clean up flag
            };
        };

        initializeTheme();

    }, []); // Run only once on mount

    // Custom setter that updates state, localStorage, and applies theme
    const setTheme = (newTheme: Theme) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("theme", newTheme);
            setThemeState(newTheme); // Update internal state
            applyThemeToElement(newTheme); // Apply theme immediately
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}