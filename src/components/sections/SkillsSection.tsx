"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import skillsData from "./../../app/data/skills.json";

export default function SkillsSection() {
    const { t } = useTranslation();

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            <h2 className="text-3xl font-bold mb-6 border-b border-primary pb-2 text-primary">
                {t("skills")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                {skillsData.map((skill, index) => (
                    <div
                        key={index}
                        className="bg-background p-5 rounded-xl shadow-md border border-primary"
                    >
                        <div className="flex justify-between mb-2 text-primary">
                            <span className="font-medium">{t(skill.name)}</span>
                            <span>{skill.level}%</span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-accent rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}