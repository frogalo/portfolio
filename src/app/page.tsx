"use client";

import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import BigFooter from "../components/ui/BigFooter";
import ProjectGrid from "../components/ui/ProjectGrid";
import ThemeProvider, { useTheme } from "../components/layout/ThemeProvider";
import ThemeSwitcher from "../components/icons/ThemeSwitcher";
import LanguageSwitcher from "../components/icons/LanguageSwitcher";

// Import data
import projectsData from "./data/projects.json";
import experienceData from "./data/experience.json";

// Type definitions for data
interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    websiteUrl: string | null;
}

interface Role {
    title: string;
    period: string;
}

interface CompanyExperience {
    type: "experience";
    company: string;
    roles: Role[];
}

interface EducationEntry {
    type: "education";
    university: string;
    degree: string;
    period: string;
}

type ExperienceOrEducation = CompanyExperience | EducationEntry;

export default function HomePage() {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);


    // Hero Animation State
    const [heroState, setHeroState] = useState<0 | 1 | 2 | 3>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeroState((prev) => (prev + 1) % 4 as 0 | 1 | 2 | 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const heroText = useMemo(() => {
        switch (heroState) {
            case 0:
                return {
                    line1: t("heroRole1Line1"),
                    line2: t("heroRole1Line2"),
                    line3: t("heroRole1Line3"),
                    color: "text-[#2196f3]" // Blue for IT Project Manager
                };
            case 1:
                return {
                    line1: t("heroRole2Line1"),
                    line2: t("heroRole2Line2"),
                    line3: t("heroRole2Line3"),
                    color: "text-[var(--nav-btn-color)]" // Creative - Primary (Purple)
                };
            case 2:
                return {
                    line1: t("heroRole3Line1"),
                    line2: t("heroRole3Line2"),
                    line3: t("heroRole3Line3"),
                    color: "text-[#e91e63]" // Network - Pink
                };
            case 3:
                return {
                    line1: t("heroRole4Line1"),
                    line2: t("heroRole4Line2"),
                    line3: t("heroRole4Line3"),
                    color: "text-[#4caf50]" // Cloud - Green
                };
        }
    }, [heroState, t]);

    // Simplified dynamic color helper to just return the class
    const getHeroColorClass = (state: number) => {
        switch (state) {
            case 0: return "text-[#2196f3]"; // IT Project Manager - Blue
            case 1: return "text-[var(--primary)]"; // Creative - Primary (Purple)
            case 2: return "text-[var(--accent)]"; // Network - Accent (Pink/Red)
            case 3: return "text-[#4caf50]"; // Cloud - Green
        }
    };

    // Data Processing
    const { projects, experience, education } = useMemo(() => {
        // Map Projects
        const mappedProjects = (projectsData as Project[]).map((p) => ({
            year: t("gridWeb"),
            category: p.category.toUpperCase(),
            title: t(p.title),
            description: t(p.description),
            tag: p.websiteUrl ? t("gridLive") : t("gridProject"),
        }));

        // Map Experience
        const mappedExperience = (experienceData as ExperienceOrEducation[])
            .filter((e): e is CompanyExperience => e.type === "experience")
            .map((e) => ({
                year: e.roles[0]?.period.split(" ")[0] || t("gridExp"),
                category: t("gridWork"),
                title: t(e.company),
                description: t(e.roles[0]?.title),
                tag: e.roles[0]?.period,
            }));

        // Map Education
        const mappedEducation = (experienceData as ExperienceOrEducation[])
            .filter((e): e is EducationEntry => e.type === "education")
            .map((e) => ({
                year: e.period.split(" ")[0] || t("gridEdu"),
                category: t("gridDegree"),
                title: t(e.university),
                description: t(e.degree),
                tag: e.period,
            }));

        return { projects: mappedProjects, experience: mappedExperience, education: mappedEducation };
    }, [t]);

    return (
        <div className="bg-background min-h-screen text-text selection:bg-accent selection:text-background font-sans overflow-x-hidden">
            {/* Navbar - Minimalist with Toggles */}
            <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 text-primary mix-blend-difference pointer-events-none">
                <div></div>
                <div className="flex items-center gap-4 pointer-events-auto mix-blend-normal">
                    <LanguageSwitcher />
                    <ThemeSwitcher currentTheme={theme} onThemeChangeAction={setTheme} />
                </div>
            </div>


            {/* HERO SECTION */}
            <section ref={targetRef} className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 pt-20">
                <motion.div style={{ opacity: opacityHero, scale: scaleHero }} className="w-full max-w-[1920px] mx-auto z-10">
                    <div className="flex flex-col uppercase leading-[0.85] tracking-tighter">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[min(11vw,15vh)] lg:text-[8vw] font-bold text-text mb-6 pb-0"
                        >
                            JAKUB
                        </motion.h1>
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[min(11vw,15vh)] lg:text-[8vw] font-bold text-text mb-12 pb-0"
                        >
                            URBAŃSKI
                        </motion.h1>

                        {/* Dynamic Text Section - Height constrained to prevent shift */}
                        <div className="flex flex-col md:flex-row items-end md:items-start min-h-[min(11vw,15vh)] lg:min-h-[8vw] relative">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={heroText.line1}
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -100, opacity: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className={`text-[min(11vw,15vh)] lg:text-[8vw] font-bold z-20 absolute md:static left-0 whitespace-nowrap ${getHeroColorClass(heroState)}`}
                                >
                                    {heroText.line1}
                                </motion.h2>
                            </AnimatePresence>

                            {/* Floating Image/Gradient Placeholder */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.8 }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                className="hidden md:block w-40 h-40 md:w-64 md:h-80 bg-gradient-to-br from-accent to-secondary blur-2xl absolute right-[10%] top-[30%] md:top-[20%] opacity-60 z-0 rounded-full"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row min-h-[min(11vw,15vh)] lg:min-h-[8vw]">
                            <div className="hidden md:block w-1/4"></div> {/* Spacer */}
                            <div className="w-full text-right md:text-left relative">
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={heroText.line2}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -100, opacity: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-[min(11vw,15vh)] lg:text-[8vw] font-bold text-text inline-block whitespace-nowrap"
                                    >
                                        {heroText.line2}
                                    </motion.h2>
                                </AnimatePresence>
                            </div>
                        </div>

                        {heroText.line3 && (
                            <div className="min-h-[min(11vw,15vh)] lg:min-h-[8vw] text-right">
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={heroText.line3}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -100, opacity: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-[min(11vw,15vh)] lg:text-[8vw] font-bold text-text inline-block whitespace-nowrap"
                                    >
                                        {heroText.line3}
                                    </motion.h2>
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                </motion.div>
            </section>

            {/* SEPARATE GRIDS */}
            <section className="relative w-full max-w-[1920px] mx-auto z-20 bg-background pb-20">
                <ProjectGrid
                    id="projects"
                    title={t("projects")}
                    themeColor="text-primary"
                    items={projects}
                />

                <ProjectGrid
                    id="experience"
                    title={t("Experience")}
                    themeColor="text-secondary"
                    items={experience}
                />

                <ProjectGrid
                    id="education"
                    title={t("Education")}
                    themeColor="text-accent"
                    items={education}
                />
            </section>

            {/* BIG FOOTER */}
            <BigFooter />

        </div>
    );
}