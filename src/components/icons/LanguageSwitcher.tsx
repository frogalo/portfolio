"use client";

import i18n from "i18next";

export default function LanguageSwitcher() {
    const changeLanguage = (lng: string) => {
        if (i18n.isInitialized) {
            i18n.changeLanguage(lng);
        } else {
            console.error("i18next is not initialized yet.");
        }
    };

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 sm:left-4 sm:translate-x-0 flex space-x-2">
            <button
                onClick={() => changeLanguage("en")}
                className="p-2 rounded bg-secondary text-primary text-sm sm:text-base"
            >
                <span className="block sm:hidden">EN</span> {/* Show "EN" on mobile */}
                <span className="hidden sm:block">English</span> {/* Show "English" on larger screens */}
            </button>
            <button
                onClick={() => changeLanguage("pl")}
                className="p-2 rounded bg-secondary text-primary text-sm sm:text-base"
            >
                <span className="block sm:hidden">PL</span> {/* Show "PL" on mobile */}
                <span className="hidden sm:block">Polski</span> {/* Show "Polski" on larger screens */}
            </button>
        </div>
    );
}
