"use client";

import { useTranslation } from "react-i18next";

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <main className="min-h-screen flex items-center justify-center bg-primary">
            <h1 className="text-4xl font-bold text-primary">
                {t("welcome")}
            </h1>
        </main>
    );
}
