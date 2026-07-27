"use client";

import React, { useState, useEffect } from "react";
import i18n, { initI18next } from "../../lib/i18n";
import LoadingScreen from "../ui/LoadingScreen";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeI18next = async () => {
            await initI18next();
            setIsInitialized(true);
        };

        initializeI18next().then(() => {
            if (i18n.language) {
                document.documentElement.lang = i18n.language.split("-")[0];
            }
        }).catch((error) => {
            console.error("Error initializing i18next:", error);
        });

        const handleLanguageChange = (lng: string) => {
            document.documentElement.lang = lng.split("-")[0];
        };

        i18n.on("languageChanged", handleLanguageChange);

        return () => {
            i18n.off("languageChanged", handleLanguageChange);
        };
    }, []);

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}