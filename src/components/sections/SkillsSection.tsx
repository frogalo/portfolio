"use client";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import skillsData from "@/app/data/skills.json";
import Image from "next/image";

interface Skill {
    name: string;
    level: number;
    iconSlug: string;
    subSkills: string[];
}

export default function SkillsSection() {
    const { t } = useTranslation();
    const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

    // Function to get the icon source path
    const getSkillIconSrc = (slug: string | null) => {
        if (!slug) return null;
        return `/icons/${slug}.svg`;
    };

    const handleSkillClick = (index: number) => {
        setExpandedSkill(expandedSkill === index ? null : index);
    };

    // Function to get accent color for sub-skills
    const getAccentColor = (index: number) => {
        const colors = [
            "bg-accent",
            "bg-purple-accent",
            "bg-gold-accent",
            "bg-secondary",
        ];
        return colors[index % colors.length];
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
                {(skillsData as Skill[]).map((skill, index) => {
                    const iconSrc = getSkillIconSrc(skill.iconSlug);
                    const isExpanded = expandedSkill === index;

                    return (
                        <motion.div
                            key={index}
                            layout
                            className={`bg-background rounded-xl shadow-lg border border-primary transition-all duration-300 cursor-pointer hover:shadow-xl ${
                                isExpanded ? "md:col-span-2" : ""
                            }`}
                            onClick={() => handleSkillClick(index)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Main Skill Header */}
                            <div className="p-6 flex items-center">
                                {/* Icon Display */}
                                {iconSrc ? (
                                    <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg mr-4 p-2 flex-shrink-0">
                                        <Image
                                            src={iconSrc}
                                            alt={`${skill.name} icon`}
                                            width={32} // Specify width
                                            height={32} // Specify height
                                            className="w-8 h-8" // Maintain original class for styling
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-lg mr-4 p-2 flex-shrink-0">
                                        <span className="text-primary text-lg font-bold">?</span>
                                    </div>
                                )}

                                {/* Skill Name and Level */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between mb-2 text-primary">
                                        <span className="font-medium text-lg">{t(skill.name)}</span>
                                        <div className="flex items-center gap-2">
                                            <span>{skill.level}%</span>
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-primary"
                                            >
                                                ▼
                                            </motion.div>
                                        </div>
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

                            {/* Expandable Sub-Skills */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6">
                                            <div className="border-t border-primary/20 pt-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="h-0.5 bg-gradient-to-r from-accent via-purple-accent to-gold-accent flex-1 rounded-full"></div>
                                                    <h4 className="text-sm font-bold text-primary uppercase tracking-wide px-3 py-1 rounded-full border border-primary/30 bg-primary-lighter">
                                                        {t("expertise_areas")}
                                                    </h4>
                                                    <div className="h-0.5 bg-gradient-to-l from-accent via-purple-accent to-gold-accent flex-1 rounded-full"></div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {skill.subSkills.map((subSkill, subIndex) => (
                                                        <motion.div
                                                            key={subIndex}
                                                            initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                                            animate={{ y: 0, opacity: 1, scale: 1 }}
                                                            transition={{
                                                                duration: 0.4,
                                                                delay: subIndex * 0.06,
                                                                type: "spring",
                                                                stiffness: 200,
                                                                damping: 20,
                                                            }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                transition: { duration: 0.2 },
                                                            }}
                                                            className="group relative overflow-hidden"
                                                        >
                                                            {/* Background gradient */}
                                                            <div className="absolute inset-0 bg-gradient-to-br from-primary-lighter via-secondary/20 to-accent/10 rounded-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>

                                                            {/* Content */}
                                                            <div className="relative flex items-center gap-3 p-3 rounded-lg border border-primary/20 bg-background/80 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group-hover:shadow-lg">
                                                                {/* Animated dot with color cycling */}
                                                                <motion.div
                                                                    className={`w-3 h-3 rounded-full flex-shrink-0 ${getAccentColor(
                                                                        subIndex
                                                                    )}`}
                                                                    whileHover={{ scale: 1.3 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <motion.div
                                                                        className="w-full h-full rounded-full bg-white/20"
                                                                        animate={{
                                                                            scale: [1, 1.2, 1],
                                                                            opacity: [0.8, 1, 0.8],
                                                                        }}
                                                                        transition={{
                                                                            duration: 2,
                                                                            repeat: Infinity,
                                                                            delay: subIndex * 0.2,
                                                                        }}
                                                                    />
                                                                </motion.div>

                                                                {/* Text */}
                                                                <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors duration-300 leading-tight">
                                  {t(subSkill)}
                                </span>
                                                            </div>

                                                            {/* Shine effect on hover */}
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
                                                                style={{ transform: "skewX(-20deg)" }}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </div>

                                                {/* Bottom accent line */}
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.8, delay: 0.5 }}
                                                    className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
}