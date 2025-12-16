"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLng = i18n.language || 'en';

    const changeLanguage = (lng: string) => {
        if (i18n.isInitialized) {
            i18n.changeLanguage(lng);
            // Optionally save to localStorage here if not handled by ThemeProvider or elsewhere
            // localStorage.setItem('language', lng);
        } else {
            console.error("i18next is not initialized yet.");
        }
    };

    const toggleLanguage = () => {
        const nextLng = currentLng.startsWith('en') ? 'pl' : 'en';
        changeLanguage(nextLng);
    };

    return (
        <button
            onClick={toggleLanguage}
            className={`
                px-3 py-2 border-2 transition-all duration-300 ease-out cursor-pointer flex items-center justify-center font-bold tracking-wider relative overflow-hidden group
                rounded-none
                border-[var(--secondary)] text-[var(--secondary)]
                hover:border-[var(--nav-btn-color)] hover:bg-[var(--nav-btn-color)] hover:text-[var(--text)] hover:shadow-[0_0_15px_var(--nav-btn-color)]
                active:scale-95
            `}
            aria-label={`Current Language: ${currentLng.toUpperCase()}. Click to switch.`}
        >
            <span className="block sm:hidden transition-transform duration-300 group-hover:scale-110">
                {currentLng.startsWith('en') ? 'EN' : 'PL'}
            </span>
            <span className="hidden sm:block transition-transform duration-300 group-hover:scale-105">
                {currentLng.startsWith('en') ? 'ENGLISH' : 'POLSKI'}
            </span>
        </button>
    );
}