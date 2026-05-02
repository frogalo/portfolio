"use client";

import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import BigFooter from "../components/ui/BigFooter";
import ProjectGrid from "../components/ui/ProjectGrid";
import ProjectModal from "../components/ui/ProjectModal";
import ThemeProvider, { useTheme } from "../components/layout/ThemeProvider";
import ThemeSwitcher from "../components/icons/ThemeSwitcher";
import LanguageSwitcher from "../components/icons/LanguageSwitcher";
import { trackContentClick, usePageViewTracker } from "../lib/analytics";

// Type definitions for data
interface BilingualString {
    en: string;
    pl: string;
    isBilingual: true;
}

type I18nString = string | BilingualString;

interface Project {
    id: string;
    title: I18nString;
    description: I18nString;
    category: I18nString;
    websiteUrl: string | null;
    year?: string;
    tech: { name: string }[];
    details?: I18nString;
    images?: string[];
}

interface Role {
    title: I18nString;
    period: string;
    skills?: string;
    responsibilities?: string[];
}

interface CompanyExperience {
    id: string;
    type: "experience";
    companyEn: string;
    companyPl: string;
    logo?: string;
    roles: Role[];
    skills?: string;
}

interface EducationEntry {
    id: string;
    type: "education";
    universityEn: string;
    universityPl: string;
    logo?: string;
    degree: I18nString;
    period: string;
    invertOnDark?: boolean;
    skills?: I18nString;
    details?: I18nString;
}

type ExperienceOrEducation = CompanyExperience | EducationEntry;

interface HomeContentProps {
    initialProjects: Project[];
    initialExperience: ExperienceOrEducation[];
}

export default function HomeContent({ initialProjects, initialExperience }: HomeContentProps) {
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();
    usePageViewTracker(); // Track page views for analytics

    const resolveI18n = (val: I18nString | undefined) => {
        if (!val) return "";
        if (typeof val === "string") return t(val);
        return val[i18n.language as 'en' | 'pl'] || val.en;
    };

    // Modal State
    const [activeModalItem, setActiveModalItem] = useState<{ type: 'projects' | 'experience' | 'education', id: string } | null>(null);
    const lastTrackedModalRef = useRef<string | null>(null);

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

    const getHeroColorClass = (state: number) => {
        switch (state) {
            case 0: return "text-[#2196f3]";
            case 1: return "text-[var(--primary)]";
            case 2: return "text-[var(--accent)]";
            case 3: return "text-[#4caf50]";
        }
    };

    // Data Processing
    const { projects, experience, education } = useMemo(() => {
        const formatDate = (dateString: string) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return dateString.split(' ').map(part => {
                const cleanPart = part.replace(/[^a-zA-Z]/g, '');
                if (months.includes(cleanPart)) return t(cleanPart.toLowerCase());
                if (part === 'Present') return t('present');
                return part;
            }).join(' ');
        };

        const mappedProjects = initialProjects.map((p) => ({
            id: p.id,
            year: p.year || t("gridWeb"),
            category: resolveI18n(p.category).toUpperCase(),
            title: resolveI18n(p.title),
            description: resolveI18n(p.description),
            tag: p.websiteUrl ? t("gridLive") : t("gridProject"),
            hoverTags: p.tech.map(t => t.name).map(name => t(name)),
            details: p.details ? resolveI18n(p.details) : "",
            images: p.images,
            websiteUrl: p.websiteUrl
        }));

        const mappedExperience = initialExperience
            .filter((e): e is CompanyExperience => e.type === "experience")
            .map((e) => ({
                id: e.id,
                year: e.roles[0]?.period.split(" ")[0] || t("gridExp"),
                category: t("gridWork"),
                title: i18n.language === 'pl' ? e.companyPl : e.companyEn,
                description: resolveI18n(e.roles[0]?.title),
                tag: formatDate(e.roles[0]?.period),
                logo: e.logo,
                hoverTags: e.roles[0]?.skills ? e.roles[0].skills.split(", ").map(s => t(s.trim())) : [],
                details: e.roles[0]?.responsibilities && e.roles[0].responsibilities.length > 0 
                    ? e.roles[0].responsibilities.join('\n')
                    : (e.companyEn.includes("Reikon") ? t('exp_reikon_details')
                        : e.companyEn.includes("CIE") ? t('exp_cie_details')
                            : e.companyEn.includes("Orange") ? t('exp_orange_details')
                                : t('exp_ep_details')),
                images: e.logo ? [e.logo] : [],
                websiteUrl: null
            }));

        const mappedEducation = initialExperience
            .filter((e): e is EducationEntry => e.type === "education")
            .map((e) => ({
                id: e.id,
                year: e.period.split(" ")[0] || t("gridEdu"),
                category: t("gridDegree"),
                title: i18n.language === 'pl' ? e.universityPl : e.universityEn,
                description: resolveI18n(e.degree),
                tag: formatDate(e.period),
                logo: e.logo,
                invertOnDark: e.universityEn.includes("Warsaw University of Technology") || e.universityEn.includes("University of Warsaw"),
                hoverTags: e.skills ? (typeof e.skills === 'string' ? e.skills : resolveI18n(e.skills)).split(", ").map(s => t(s.trim())) : [],
                details: e.details ? resolveI18n(e.details) : (
                    e.universityEn.includes("Technology") ? t('edu_wut_details')
                        : e.universityEn.includes("Japanese") ? t('edu_pjatk_details')
                            : t('edu_uw_details')
                ),
                images: e.logo ? [e.logo] : [],
                websiteUrl: null
            }));

        return { projects: mappedProjects, experience: mappedExperience, education: mappedEducation };
    }, [t, i18n.language, initialProjects, initialExperience]);

    const selectedProject = useMemo(() => {
        if (!activeModalItem) return null;
        const categoryList = activeModalItem.type === 'projects' ? projects :
            activeModalItem.type === 'experience' ? experience :
                activeModalItem.type === 'education' ? education : [];
        return categoryList.find(item => item.id === activeModalItem.id) || null;
    }, [activeModalItem, projects, experience, education]);

    useEffect(() => {
        if (!activeModalItem || !selectedProject?.id) {
            lastTrackedModalRef.current = null;
            return;
        }

        const trackingKey = `${activeModalItem.type}:${selectedProject.id}`;
        if (lastTrackedModalRef.current === trackingKey) {
            return;
        }

        trackContentClick(
            activeModalItem.type === "projects" ? "project" : activeModalItem.type,
            selectedProject.id,
            selectedProject.title
        );
        lastTrackedModalRef.current = trackingKey;
    }, [activeModalItem, selectedProject]);

    const headerClass = activeModalItem
        ? "flex-col items-end gap-2 fixed z-[110] right-4 top-20 w-auto"
        : "flex justify-between items-center fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference pointer-events-none";

    const headerContentClass = activeModalItem
        ? "flex flex-col gap-4 pointer-events-auto mix-blend-normal"
        : "flex items-center gap-4 pointer-events-auto mix-blend-normal";

    return (
        <div className="bg-background min-h-screen text-text selection:bg-accent selection:text-background font-sans overflow-x-hidden">
            <div className={`transition-all duration-300 ${headerClass}`}>
                {!activeModalItem && <div></div>}
                <div className={headerContentClass}>
                    <LanguageSwitcher />
                    <ThemeSwitcher currentTheme={theme} onThemeChangeAction={setTheme} />
                </div>
            </div>

            <section ref={targetRef} className="relative min-h-screen flex flex-col justify-start px-4 md:px-8 pt-[40px]">
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
                        </div>

                        <div className="flex flex-col md:flex-row min-h-[min(11vw,15vh)] lg:min-h-[8vw]">
                            <div className="hidden md:block w-1/4"></div>
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

            <section className="relative w-full max-w-[1920px] mx-auto z-20 bg-background pb-20">
                <ProjectGrid
                    id="projects"
                    title={t("projects")}
                    themeColor="text-primary"
                    items={projects}
                    onItemClick={(item) => setActiveModalItem({ type: 'projects', id: item.id! })}
                />
                <ProjectGrid
                    id="experience"
                    title={t("Experience")}
                    themeColor="text-secondary"
                    items={experience}
                    onItemClick={(item) => setActiveModalItem({ type: 'experience', id: item.id! })}
                />
                <ProjectGrid
                    id="education"
                    title={t("Education")}
                    themeColor="text-accent"
                    items={education}
                    onItemClick={(item) => setActiveModalItem({ type: 'education', id: item.id! })}
                />
            </section>

            <ProjectModal
                isOpen={!!activeModalItem}
                onClose={() => setActiveModalItem(null)}
                project={selectedProject}
                themeColor={
                    activeModalItem?.type === 'projects' ? 'text-primary' :
                        activeModalItem?.type === 'experience' ? 'text-secondary' : 'text-accent'
                }
            />
            <BigFooter />
        </div>
    );
}
