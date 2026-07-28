"use client";

import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import BigFooter from "../components/ui/BigFooter";
import ProjectCards from "../components/ui/ProjectCards";
import WorkList from "../components/ui/WorkList";
import ProjectModal from "../components/ui/ProjectModal";
import ThemeProvider, { useTheme } from "../components/layout/ThemeProvider";
import Header from "../components/layout/Header";
import { trackContentClick, usePageViewTracker } from "../lib/analytics";
import ShaderBackground from "../components/ui/ShaderBackground";
import { Shield, Zap, Award, Cpu } from "lucide-react";

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
    disableUrl?: boolean;
    isMobile?: boolean;
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

    const opacityScrollContainer = useTransform(scrollYProgress, [0.15, 0.6], [1, 0]);
    const opacityName = useTransform(scrollYProgress, [0.8, 1.0], [1, 0]);

    const [showLogo, setShowLogo] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest >= 1) {
            setShowLogo(true);
        } else {
            setShowLogo(false);
        }
    });


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
            tag: (p.websiteUrl && !p.disableUrl) ? t("gridLive") : t("gridProject"),
            hoverTags: p.tech.map(t => t.name).map(name => t(name)),
            details: p.details ? resolveI18n(p.details) : "",
            images: p.images,
            websiteUrl: p.websiteUrl,
            disableUrl: p.disableUrl,
            isMobile: p.isMobile
        }));

        const mappedExperience = initialExperience
            .filter((e): e is CompanyExperience => e.type === "experience")
            .map((e) => ({
                id: e.id,
                year: e.roles[0]?.period.split(" ")[0] || t("gridExp"),
                category: t("gridWork"),
                title: i18n.language === 'pl' ? (e.companyPl || e.companyEn || "") : (e.companyEn || ""),
                description: resolveI18n(e.roles[0]?.title),
                tag: formatDate(e.roles[0]?.period),
                logo: e.logo,
                hoverTags: e.roles[0]?.skills ? e.roles[0].skills.split(", ").map(s => t(s.trim())) : [],
                details: e.roles[0]?.responsibilities && e.roles[0].responsibilities.length > 0 
                    ? e.roles[0].responsibilities.join('\n')
                    : ((e.companyEn || "").includes("Reikon") ? t('exp_reikon_details')
                        : (e.companyEn || "").includes("CIE") ? t('exp_cie_details')
                            : (e.companyEn || "").includes("Orange") ? t('exp_orange_details')
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
                title: i18n.language === 'pl' ? (e.universityPl || e.universityEn || "") : (e.universityEn || ""),
                description: resolveI18n(e.degree),
                tag: formatDate(e.period),
                logo: e.logo,
                invertOnDark: (e.universityEn || "").includes("Warsaw University of Technology") || (e.universityEn || "").includes("University of Warsaw"),
                hoverTags: e.skills ? (typeof e.skills === 'string' ? e.skills : resolveI18n(e.skills)).split(", ").map(s => t(s.trim())) : [],
                details: e.details ? resolveI18n(e.details) : (
                    (e.universityEn || "").includes("Technology") ? t('edu_wut_details')
                        : (e.universityEn || "").includes("Japanese") ? t('edu_pjatk_details')
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

    return (
        <div className="bg-background min-h-screen text-text selection:bg-accent selection:text-background font-sans overflow-x-hidden">
            <Header currentTheme={theme} onThemeChangeAction={setTheme} showLogo={showLogo} />

            <main>
                <h1 className="sr-only">
                    {t("seo_h1_title", "Jakub Urbański | IT Specialist & Web Developer")}
                </h1>
                <section ref={targetRef} className="relative h-screen px-6 md:px-12 pt-[120px] pb-16">
                    <ShaderBackground />

                    {/* Fixed Name Container */}
                    <motion.div 
                        style={{ opacity: opacityName }}
                        className="fixed top-[18vh] left-0 right-0 z-10 w-full max-w-[1920px] mx-auto pointer-events-none select-none px-6 md:px-12"
                    >
                        <div className="flex flex-col uppercase leading-[0.85] tracking-tighter">
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[min(11vw,15vh)] lg:text-[min(8vw,12vh)] font-bold text-text mb-6 pb-0 hero-reflection"
                                data-text="JAKUB"
                            >
                                JAKUB
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[min(11vw,15vh)] lg:text-[min(8vw,12vh)] font-bold text-text mb-12 pb-0 hero-reflection"
                                data-text="URBAŃSKI"
                            >
                                URBAŃSKI
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Scrolling Roles Container */}
                    <motion.div 
                        style={{ opacity: opacityScrollContainer }}
                        className="relative z-20 w-full max-w-[1920px] mx-auto flex flex-col mt-[42vh] mix-blend-difference"
                    >
                        <div className="flex flex-col uppercase leading-[0.85] tracking-tighter mb-12">
                            <div className="flex flex-col md:flex-row items-end md:items-start min-h-[min(11vw,15vh)] lg:min-h-[min(8vw,12vh)] relative">
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={heroText.line1}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -100, opacity: 0 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className={`text-[min(11vw,15vh)] lg:text-[min(8vw,12vh)] font-bold z-20 absolute md:static left-0 whitespace-nowrap hero-reflection ${heroText.color}`}
                                        data-text={heroText.line1}
                                    >
                                        {heroText.line1}
                                    </motion.h2>
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col md:flex-row min-h-[min(11vw,15vh)] lg:min-h-[min(8vw,12vh)]">
                                <div className="hidden md:block w-1/4"></div>
                                <div className="w-full text-right md:text-left relative">
                                    <AnimatePresence mode="wait">
                                        <motion.h2
                                            key={heroText.line2}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -100, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className={`text-[min(11vw,15vh)] lg:text-[min(8vw,12vh)] font-bold inline-block whitespace-nowrap hero-reflection ${heroText.color}`}
                                            data-text={heroText.line2}
                                        >
                                            {heroText.line2}
                                        </motion.h2>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {heroText.line3 && (
                                <div className="min-h-[min(11vw,15vh)] lg:min-h-[min(8vw,12vh)] text-right">
                                    <AnimatePresence mode="wait">
                                        <motion.h2
                                            key={heroText.line3}
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -100, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                            className={`text-[min(11vw,15vh)] lg:text-[min(8vw,12vh)] font-bold inline-block whitespace-nowrap hero-reflection ${heroText.color}`}
                                            data-text={heroText.line3}
                                        >
                                            {heroText.line3}
                                        </motion.h2>
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </section>

                <section className="relative w-full max-w-[1920px] mx-auto z-20 bg-background pb-20 flex flex-col gap-12">
                    {/* Highlights / Spec Sheet (moved here!) */}
                    <div className="px-6 md:px-12 w-full mt-24">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1920px] w-full z-10 mx-auto"
                        >
                            {/* Card 1: Quality */}
                            <div className="group relative bg-text/1 border border-text/5 p-6 flex flex-col justify-between min-h-40 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-text/3 hover:border-text/15 overflow-hidden rounded-none">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#2196f3]/20 group-hover:bg-[#2196f3] transition-colors duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_15px_rgba(33,150,243,0.5)]" />
                                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#2196f3]/5 blur-2xl group-hover:bg-[#2196f3]/10 group-hover:scale-150 transition-all duration-500 pointer-events-none" />
                                <div className="flex flex-col gap-3 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-[#2196f3] font-bold">01 /</span>
                                        <h3 className="text-xl md:text-2xl font-bold font-headline uppercase tracking-tight text-text">
                                            {t("hero_systems_label")}
                                        </h3>
                                    </div>
                                    <p 
                                        className="text-xs text-text/80 leading-relaxed font-normal font-body group-hover:text-text transition-colors duration-300"
                                        dangerouslySetInnerHTML={{ __html: t("hero_systems") }}
                                    />
                                </div>
                                <Shield 
                                    size={140} 
                                    strokeWidth={0.5} 
                                    className="absolute -bottom-8 -right-8 text-text opacity-[0.03] pointer-events-none z-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                                />
                            </div>

                            {/* Card 2: Efficiency */}
                            <div className="group relative bg-text/1 border border-text/5 p-6 flex flex-col justify-between min-h-40 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-text/3 hover:border-text/15 overflow-hidden rounded-none">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-(--nav-btn-color)/20 group-hover:bg-(--nav-btn-color) transition-colors duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_15px_rgba(233,30,99,0.5)]" />
                                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-(--nav-btn-color)/5 blur-2xl group-hover:bg-(--nav-btn-color)/10 group-hover:scale-150 transition-all duration-500 pointer-events-none" />
                                <div className="flex flex-col gap-3 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-(--nav-btn-color) font-bold">02 /</span>
                                        <h3 className="text-xl md:text-2xl font-bold font-headline uppercase tracking-tight text-text">
                                            {t("hero_dev_label")}
                                        </h3>
                                    </div>
                                    <p 
                                        className="text-xs text-text/80 leading-relaxed font-normal font-body group-hover:text-text transition-colors duration-300"
                                        dangerouslySetInnerHTML={{ __html: t("hero_dev") }}
                                    />
                                </div>
                                <Zap 
                                    size={140} 
                                    strokeWidth={0.5} 
                                    className="absolute -bottom-8 -right-8 text-text opacity-[0.03] pointer-events-none z-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                                />
                            </div>

                            {/* Card 3: Experience */}
                            <div className="group relative bg-text/1 border border-text/5 p-6 flex flex-col justify-between min-h-40 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-text/3 hover:border-text/15 overflow-hidden rounded-none">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#e91e63]/20 group-hover:bg-[#e91e63] transition-colors duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_15px_rgba(233,30,99,0.5)]" />
                                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#e91e63]/5 blur-2xl group-hover:bg-[#e91e63]/10 group-hover:scale-150 transition-all duration-500 pointer-events-none" />
                                <div className="flex flex-col gap-3 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-[#e91e63] font-bold">03 /</span>
                                        <h3 className="text-xl md:text-2xl font-bold font-headline uppercase tracking-tight text-text">
                                            {t("hero_network_label")}
                                        </h3>
                                    </div>
                                    <p 
                                        className="text-xs text-text/80 leading-relaxed font-normal font-body group-hover:text-text transition-colors duration-300"
                                        dangerouslySetInnerHTML={{ __html: t("hero_network") }}
                                    />
                                </div>
                                <Award 
                                    size={140} 
                                    strokeWidth={0.5} 
                                    className="absolute -bottom-8 -right-8 text-text opacity-[0.03] pointer-events-none z-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                                />
                            </div>

                            {/* Card 4: Solutions */}
                            <div className="group relative bg-text/1 border border-text/5 p-6 flex flex-col justify-between min-h-40 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-text/3 hover:border-text/15 overflow-hidden rounded-none">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#4caf50]/20 group-hover:bg-[#4caf50] transition-colors duration-500 shadow-[0_0_10px_transparent] group-hover:shadow-[0_0_15px_rgba(76,175,80,0.5)]" />
                                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#4caf50]/5 blur-2xl group-hover:bg-[#4caf50]/10 group-hover:scale-150 transition-all duration-500 pointer-events-none" />
                                <div className="flex flex-col gap-3 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-[#4caf50] font-bold">04 /</span>
                                        <h3 className="text-xl md:text-2xl font-bold font-headline uppercase tracking-tight text-text">
                                            {t("hero_academic_label")}
                                        </h3>
                                    </div>
                                    <p 
                                        className="text-xs text-text/80 leading-relaxed font-normal font-body group-hover:text-text transition-colors duration-300"
                                        dangerouslySetInnerHTML={{ __html: t("hero_academic") }}
                                    />
                                </div>
                                <Cpu 
                                    size={140} 
                                    strokeWidth={0.5} 
                                    className="absolute -bottom-8 -right-8 text-text opacity-[0.03] pointer-events-none z-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="relative w-full max-w-[1920px] mx-auto z-20 bg-background pb-20 flex flex-col gap-12">
                    <ProjectCards
                    id="projects"
                    title={t("projects", "Work / Projects")}
                    themeColor="text-primary"
                    items={projects as any}
                    onItemClick={(item) => setActiveModalItem({ type: 'projects', id: item.id! })}
                />
                <WorkList
                    id="experience"
                    title={t("Experience", "Experience")}
                    themeColor="text-secondary"
                    items={experience as any}
                    onItemClick={(item) => setActiveModalItem({ type: 'experience', id: item.id! })}
                />
                <WorkList
                    id="education"
                    title={t("Education", "Education")}
                    themeColor="text-accent"
                    items={education as any}
                    onItemClick={(item) => setActiveModalItem({ type: 'education', id: item.id! })}
                />
            </section>
            </main>

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
