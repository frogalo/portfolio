"use client";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function HomePage() {
    const { t } = useTranslation();
    const name = "Jakub Urbański";

    const [showWelcome, setShowWelcome] = useState(true);
    const [showContent, setShowContent] = useState(false);


    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const screenHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowWelcome(false);
            setShowContent(true);
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <main className="min-h-screen bg-primary flex items-center justify-center">
                {/* Welcome Text */}
                <AnimatePresence>
                    {showWelcome && (
                        <motion.h1
                            className="text-4xl font-bold text-primary absolute"
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -screenHeight * 0.1 }}
                            transition={{ duration: 1 }}
                        >
                            {t("welcome")}
                        </motion.h1>
                    )}
                </AnimatePresence>

                {/* Name */}
                <motion.p
                    className="text-xl font-medium text-primary absolute"
                    initial={{ opacity: 0, y: screenHeight * -0.1 }}
                    animate={{
                        opacity: 1,
                        y: showWelcome ? screenHeight * 0.03 : screenHeight * -0.470,
                        x: showWelcome ? -screenWidth * -0.1 : -screenWidth * 0.3,
                    }}
                    transition={{ duration: 1 }}
                >
                    {name.split("").map((letter, index) => (
                        <span
                            key={index}
                            className="letter"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    ))}
                </motion.p>

                {/* Projects and Experience */}
                {showContent && (
                    <motion.div
                        className="p-4 text-primary absolute top-1/3 left-10"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: screenHeight * 0.1 },
                            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.5 } },
                        }}
                    >
                        {/* Projects Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">Projects</h2>
                            <motion.ul className="list-disc pl-5">
                                {["Project 1: Description", "Project 2: Description", "Project 3: Description"].map(
                                    (project, index) => (
                                        <motion.li
                                            key={index}
                                            variants={{
                                                hidden: { opacity: 0, y: 50 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                        >
                                            {project}
                                        </motion.li>
                                    )
                                )}
                            </motion.ul>
                        </motion.div>

                        {/* Experience Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: 2 }} // Delay the appearance of experience
                        >
                            <h2 className="text-3xl font-bold mt-8 mb-4">Experience</h2>
                            <motion.ul className="list-disc pl-5">
                                {["Experience 1: Description", "Experience 2: Description", "Experience 3: Description"].map(
                                    (experience, index) => (
                                        <motion.li
                                            key={index}
                                            variants={{
                                                hidden: { opacity: 0, y: 50 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                        >
                                            {experience}
                                        </motion.li>
                                    )
                                )}
                            </motion.ul>
                        </motion.div>
                    </motion.div>
                )}
            </main>
        </>
    );
}
