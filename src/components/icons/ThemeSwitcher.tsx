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
    return (
        <div className="fixed top-4 right-4 flex items-center space-x-2">
            {/* Light Mode Button */}
            <button
                onClick={() => onThemeChangeAction("light")}
                className={`p-2 sm:p-3 rounded-full border-2 ${
                    currentTheme === "light"
                        ? "bg-primary text-accent border-primary"
                        : "border-secondary text-primary"
                }`}
                aria-label="Switch to Light Mode"
            >
                <Sun size={12} className="sm:size-4" /> {/* Smaller icon on mobile */}
            </button>

            {/* Dark Mode Button */}
            <button
                onClick={() => onThemeChangeAction("dark")}
                className={`p-2 sm:p-3 rounded-full border-2 ${
                    currentTheme === "dark"
                        ? "bg-primary text-accent border-primary"
                        : "border-secondary text-primary"
                }`}
                aria-label="Switch to Dark Mode"
            >
                <Moon size={12} className="sm:size-4" /> {/* Smaller icon on mobile */}
            </button>

            {/* System Mode Button */}
            <button
                onClick={() => onThemeChangeAction("system")}
                className={`p-2 sm:p-3 rounded-full border-2 ${
                    currentTheme === "system"
                        ? "bg-primary text-accent border-primary"
                        : "border-secondary text-primary"
                }`}
                aria-label="Switch to System Mode"
            >
                <Monitor size={12} className="sm:size-4" /> {/* Smaller icon on mobile */}
            </button>
        </div>
    );
}
