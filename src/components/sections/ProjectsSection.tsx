"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function ProjectsSection() {
    const { t } = useTranslation();

    const projects = [
        {
            title: "IT Dashboard",
            description: "IT Dashboard description",
            tech: ["React", "Node.js", "ADFS", "Google APIs"]
        },
        {
            title: "TableMate",
            description: "TableMate description",
            tech: ["Next.js", "REST API"]
        },
        {
            title: "Gramatyk",
            description: "Gramatyk description",
            tech: ["Next.js", "Serverless API"]
        },
        {
            title: "ScholarHub",
            description: "ScholarHub description",
            tech: ["React", "MongoDB", "Java Spring Boot"]
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
                {t("projects")}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="bg-background rounded-xl shadow-md overflow-hidden border border-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-primary">
                                {t(project.title)}
                            </h3>
                            <p className="text-primary mb-4">
                                {t(project.description)}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-secondary text-text text-sm rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}