"use client";

import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

interface ThemeSwitcherProps {
    currentTheme: Theme;
    onThemeChangeAction: (theme: Theme) => void;
}

export default function ThemeSwitcher({
                                          currentTheme,
                                          onThemeChangeAction,
                                      }: ThemeSwitcherProps) {

    // Helper to get Tailwind classes + CSS variable classes
    const getButtonClasses = (themeType: Theme) => {
        const baseClasses = `p-2 sm:p-3 rounded-full border-2 transition-colors duration-200 cursor-pointer flex items-center justify-center`;
        const activeClasses = `bg-[var(--purple-accent)] text-[var(--text)] border-[var(--purple-accent)]`; // Using --cyan-accent for active
        const inactiveClasses = `border-[var(--secondary)] text-[var(--secondary)] hover:border-[var(--purple-accent)] hover:bg-transparent`; // Using --gold-accent for hover

        if (currentTheme === themeType) {
            return `${baseClasses} ${activeClasses}`;
        } else {
            return `${baseClasses} ${inactiveClasses}`;
        }
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Light Mode Button */}
            <button
                onClick={() => onThemeChangeAction("light")}
                className={getButtonClasses("light")}
                aria-label="Switch to Light Mode"
            >
                <Sun size={16} />
            </button>

            {/* Dark Mode Button */}
            <button
                onClick={() => onThemeChangeAction("dark")}
                className={getButtonClasses("dark")}
                aria-label="Switch to Dark Mode"
            >
                <Moon size={16} />
            </button>

            {/* System Mode Button */}
            <button
                onClick={() => onThemeChangeAction("system")}
                className={getButtonClasses("system")}
                aria-label="Switch to System Mode"
            >
                <Monitor size={16} />
            </button>
        </div>
    );
}