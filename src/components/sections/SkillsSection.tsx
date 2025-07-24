"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import skillsData from "@/app/data/skills.json";

export default function SkillsSection() {
    const { t } = useTranslation();

    // Function to get the icon source path
    const getSkillIconSrc = (slug: string | null) => {
        if (!slug) return null;
        // Construct the path relative to the public directory
        return `/icons/${slug}.svg`;
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            <h2 className="text-4xl font-bold mb-8 border-b-2 border-primary pb-3 text-primary text-center">
                {t("skills")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                {skillsData.map((skill, index) => {
                    const iconSrc = getSkillIconSrc(skill.iconSlug);

                    return (
                        <div
                            key={index}
                            className="bg-background p-6 rounded-xl shadow-lg border border-primary flex items-center"
                        >
                            {/* Icon Display */}
                            {iconSrc ? (
                                <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg mr-4 p-2">
                                    <img
                                        src={iconSrc}
                                        alt={`${skill.name} icon`}
                                        className="w-8 h-8" // You can't dynamically color this with Tailwind's text/bg utilities directly
                                        // If you need dynamic coloring, you'd have to inline the SVG and manipulate it.
                                    />
                                </div>
                            ) : (
                                // Placeholder if no icon found
                                <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg mr-4 p-2">
                                    <span className="text-primary text-lg font-bold">?</span>
                                </div>
                            )}

                            {/* Skill Name and Level */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between mb-2 text-primary">
                                    <span className="font-medium text-lg">{t(skill.name)}</span>
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
                        </div>
                    );
                })}
            </div>
        </motion.section>
    );
}