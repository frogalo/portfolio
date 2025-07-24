"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function ExperienceSection() {
    const { t } = useTranslation();

    const experience = [
        {
            role: "IT Administrator",
            company: "Reikon Games",
            period: "01.2023 – currently",
            description: "IT Administrator at Reikon Games description"
        },
        {
            role: "IT Support and Project Coordinator",
            company: "Center for Innovative Education",
            period: "01.2017 – 12.2017 & 07.2020 – 10.2022",
            description: "IT Support and Project Coordinator description"
        },
        {
            role: "CEX Team Analyst",
            company: "Orange Poland",
            period: "01.2020 – 06.2020",
            description: "CEX Team Analyst at Orange Poland description"
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            <h2 className="text-3xl font-bold mb-6 border-b border-primary pb-2 text-primary">
                {t("experience")}
            </h2>
            <div className="space-y-8">
                {experience.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="bg-background p-6 rounded-xl shadow-md border-l-4 border-accent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="flex flex-wrap justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-primary">
                                {t(exp.role)}
                            </h3>
                            <span className="bg-secondary px-3 py-1 rounded-full text-sm text-text">
                                {exp.period}
                            </span>
                        </div>
                        <p className="text-accent font-medium mb-3">
                            {exp.company}
                        </p>
                        <p className="text-primary">
                            {t(exp.description)}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}