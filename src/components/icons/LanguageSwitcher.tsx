"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        if (i18n.isInitialized) {
            i18n.changeLanguage(lng);
            // Optionally save to localStorage here if not handled by ThemeProvider or elsewhere
            // localStorage.setItem('language', lng);
        } else {
            console.error("i18next is not initialized yet.");
        }
    };

    const currentLng = i18n.language || 'en';

    // Helper to get Tailwind classes + CSS variable classes
    const getButtonClasses = (lng: string) => {
        const baseClasses = `p-2 rounded transition-colors duration-200 cursor-pointer flex items-center justify-center`;
        const activeClasses = `bg-[var(--purple-accent)] text-[var(--text)] border-2 border-[var(--purple-accent)]`; // Using --cyan-accent for active
        const inactiveClasses = `bg-[var(--secondary)] text-[var(--primary)] border-2 border-[var(--secondary)] hover:bg-[var(--gold-accent)] hover:border-[var(--gold-accent)]`; // Using --gold-accent for hover

        if (currentLng.startsWith(lng)) {
            return `${baseClasses} ${activeClasses}`;
        } else {
            return `${baseClasses} ${inactiveClasses}`;
        }
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => changeLanguage("en")}
                className={getButtonClasses("en")}
            >
                <span className="block sm:hidden">EN</span>
                <span className="hidden sm:block">English</span>
            </button>
            <button
                onClick={() => changeLanguage("pl")}
                className={getButtonClasses("pl")}
            >
                <span className="block sm:hidden">PL</span>
                <span className="hidden sm:block">Polski</span>
            </button>
        </div>
    );
}