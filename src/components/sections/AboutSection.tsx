"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function AboutSection() {
    const { t } = useTranslation();

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            <h2 className="text-3xl font-bold mb-6 border-b border-primary pb-2 text-primary">
                {t("about")}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <p className="mb-4 text-lg text-primary">
                        {t("aboutText1")}
                    </p>
                    <p className="text-lg text-primary">
                        {t("aboutText2")}
                    </p>
                </div>
                <div className="bg-background p-6 rounded-xl shadow-md border border-primary">
                    <h3 className="text-xl font-semibold mb-4 text-primary">
                        {t("contact")}
                    </h3>
                    <ul className="space-y-2 text-primary">
                        <li className="flex items-center">
                            <span className="font-medium w-24">{t("contactLocationLabel")}</span>
                            <span>{t("contactLocationValue")}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="font-medium w-24">{t("contactPhoneLabel")}</span>
                            <span>{t("contactPhoneValue")}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="font-medium w-24">{t("contactEmailLabel")}</span>
                            <span>{t("contactEmailValue")}</span>
                        </li>
                        <li className="flex items-center">
                            <span className="font-medium w-24">{t("contactGithubLabel")}</span>
                            <span>{t("contactGithubValue")}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.section>
    );
}