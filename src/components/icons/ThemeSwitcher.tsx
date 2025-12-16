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

    const cycleTheme = () => {
        if (currentTheme === "light") onThemeChangeAction("dark");
        else if (currentTheme === "dark") onThemeChangeAction("system");
        else onThemeChangeAction("light");
    };

    const getIcon = () => {
        switch (currentTheme) {
            case "light": return <Sun size={20} strokeWidth={2.5} />;
            case "dark": return <Moon size={20} strokeWidth={2.5} />;
            case "system": return <Monitor size={20} strokeWidth={2.5} />;
        }
    };

    return (
        <button
            onClick={cycleTheme}
            className={`
                p-2 sm:p-3 border-2 transition-all duration-300 ease-out cursor-pointer flex items-center justify-center relative overflow-hidden group
                rounded-none
                border-[var(--secondary)] text-[var(--secondary)]
                hover:border-[var(--nav-btn-color)] hover:bg-[var(--nav-btn-color)] hover:text-[var(--text)] hover:shadow-[0_0_15px_var(--nav-btn-color)]
                active:scale-95
            `}
            aria-label={`Current Theme: ${currentTheme}. Click to cycle.`}
        >
            <div className="transition-transform duration-300 group-hover:rotate-12 group-active:rotate-90">
                {getIcon()}
            </div>
        </button>
    );
}