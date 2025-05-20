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
        <div className="fixed top-4 left-4 flex space-x-2">
            <button
                onClick={() => changeLanguage("en")}
                className="p-2 rounded bg-secondary text-primary"
            >
                English
            </button>
            <button
                onClick={() => changeLanguage("pl")}
                className="p-2 rounded bg-secondary text-primary"
            >
                Polski
            </button>
        </div>
    );
}
