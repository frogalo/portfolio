"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import projectsData from "../../app/data/projects.json";
import ProjectModal from "../../components/ui/ProjectModal";
import Image from 'next/image';

interface TechItem {
    name: string;
    isNew?: boolean;
}

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    tech: TechItem[];
    details: string;
    images: string[];
    websiteUrl: string | null;
}

export default function ProjectsSection() {
    const { t } = useTranslation();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    // Get unique categories
    const categories = ["all", ...new Set(projectsData.map(project => project.category))];

    // Filter projects based on active category
    const filteredProjects = activeCategory === "all"
        ? projectsData
        : projectsData.filter(project => project.category === activeCategory);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            <h2 className="text-4xl font-bold mb-8 border-b-2 border-primary pb-3 text-primary text-center">
                {t("projects")}
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                            activeCategory === category
                                ? "bg-purple-accent text-background"
                                : "bg-secondary text-text hover:bg-primary/20"
                        }`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {t(category)} {/* <-- FIXED: Apply t() directly to the category string */}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-background rounded-xl shadow-lg border border-primary overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300"
                        onClick={() => handleProjectClick(project)}
                    >
                        <div className="relative h-48 overflow-hidden">
                            {project.images && project.images.length > 0 && (
                                <Image
                                    src={project.images[0]}
                                    alt={`${t(project.title)} thumbnail`}
                                    fill
                                    className="object-cover"
                                />
                            )}
                            <div className="absolute top-2 right-2 bg-purple-accent text-[var(--header-txt)] text-xs font-bold px-2 py-1 rounded-full">
                                {t(project.category)} {/* <-- FIXED: Apply t() directly to the category string */}
                            </div>
                        </div>

                        <div className="p-6 flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-primary">
                                {t(project.title)}
                            </h3>
                            <p className="text-primary mb-4 text-sm text-gray-300 dark:text-gray-400">
                                {t(project.description)}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tech.slice(0, 5).map((techItem, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-secondary text-text text-xs rounded-full flex items-center gap-1"
                                    >
                                        <span>{techItem.name}</span> {/* Assuming tech.name is consistent or translated via a separate t() call */}
                                        {techItem.isNew && (
                                            <span className="bg-purple-accent text-[var(--header-txt)] text-xs font-bold px-1 py-0 rounded-full">
                                                {t("New")} {/* Translating "New" as well */}
                                            </span>
                                        )}
                                    </span>
                                ))}
                                {project.tech.length > 5 && (
                                    <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                                        {t("+{{count}} more", { count: project.tech.length - 5 })} {/* Translating "+X more" */}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ProjectModal project={selectedProject} onCloseAction={closeModal} />
        </motion.section>
    );
}