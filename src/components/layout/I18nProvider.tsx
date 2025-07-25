"use client";

import React, {useState, useEffect} from "react";
import {initI18next} from "../../lib/i18n";

export default function I18nProvider({children}: { children: React.ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeI18next = async () => {
            await initI18next();
            setIsInitialized(true);
        };

        initializeI18next().then(() => {
            // console.log("i18next has been initialized successfully.");
        }).catch((error) => {
            console.error("Error initializing i18next:", error);
        });
    }, []);

    if (!isInitialized) {
        return <div>Loading translations...</div>; // Show a loading state until i18next is ready
    }

    return <>{children}</>;
}