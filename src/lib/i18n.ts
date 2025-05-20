"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resources from "./i18nResources";

export const initI18next = async () => {
    if (!i18n.isInitialized) {
        await i18n
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                resources,
                fallbackLng: "en",
                interpolation: {
                    escapeValue: false,
                },
                debug: process.env.NODE_ENV === "development",
            });
    }
};

export default i18n;
