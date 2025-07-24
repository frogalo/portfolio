"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState, useContext, useEffect } from "react"; // Import useEffect
import Header from "@/components/layout/Header";
import { ThemeContext } from "@/components/layout/ThemeProvider";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

export default function HomePage() {
    const { t } = useTranslation();
    // Initialize state from localStorage or default to "about"
    const [activeSection, setActiveSection] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeSection') || 'about';
        }
        return 'about'; // Default for SSR or when window is not available
    });
    const { theme, setTheme } = useContext(ThemeContext);

    // Update localStorage whenever activeSection changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeSection', activeSection);
        }
    }, [activeSection]); // Dependency array ensures this runs only when activeSection changes

    return (
        <div className="min-h-screen bg-background text-text">
            <Header
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                currentTheme={theme}
                onThemeChange={setTheme}
            />

            <main className="container mx-auto px-4 pt-24 pb-16">
                {/* Hero Section */}
                <section className="py-16 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                            {t("heroTitle")}
                        </h1>
                        <p className="text-xl text-primary max-w-2xl">
                            {t("heroDescription")}
                        </p>
                    </motion.div>
                </section>

                {/* Dynamic Sections */}
                {activeSection === "about" && <AboutSection />}
                {activeSection === "skills" && <SkillsSection />}
                {activeSection === "projects" && <ProjectsSection />}
                {activeSection === "experience" && <ExperienceSection />}
            </main>

            <footer className="py-8 text-center text-primary border-t border-primary">
                <p>© {new Date().getFullYear()} Jakub Urbański. {t("allRightsReserved")}</p>
            </footer>
        </div>
    );
}