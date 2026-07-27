"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ProjectItem {
    id: string;
    year: string;
    category: string;
    title: string;
    description: string;
    tag: string;
    hoverTags?: string[];
    details?: string;
    images?: string[];
    websiteUrl?: string | null;
}

interface ProjectCardsProps {
    id?: string;
    title: string;
    items: ProjectItem[];
    onItemClick?: (item: ProjectItem) => void;
    themeColor?: string; // Tailwind text color class, e.g. "text-primary"
}

const DEFAULT_TECH_SVGS = [
    // SVG 1: Dashboard / UI representation
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250' fill='none'><rect width='400' height='250' fill='%23130330'/><g opacity='0.35'><circle cx='200' cy='125' r='100' stroke='%23813ef4' stroke-width='1'/><circle cx='200' cy='125' r='70' stroke='%23f10ead' stroke-width='1'/><line x1='100' y1='125' x2='300' y2='125' stroke='%23813ef4' stroke-width='0.5'/><line x1='200' y1='25' x2='200' y2='225' stroke='%23813ef4' stroke-width='0.5'/></g><rect x='50' y='50' width='300' height='150' rx='4' stroke='%23813ef4' stroke-width='1.5' fill='%230b0118' fill-opacity='0.8'/><circle cx='70' cy='65' r='3' fill='%23f10e61'/><circle cx='80' cy='65' r='3' fill='%23f10ead'/><circle cx='90' cy='65' r='3' fill='%232196f3'/><path d='M70 100h260M70 120h100M70 140h150M70 160h80' stroke='%23813ef4' stroke-width='1' stroke-linecap='round' opacity='0.6'/></svg>",
    // SVG 2: Network / Nodes representation
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250' fill='none'><rect width='400' height='250' fill='%23130330'/><g opacity='0.5'><line x1='100' y1='60' x2='200' y2='150' stroke='%23f10ead' stroke-width='1.5'/><line x1='200' y1='150' x2='300' y2='80' stroke='%23813ef4' stroke-width='1.5'/><line x1='200' y1='150' x2='150' y2='210' stroke='%232196f3' stroke-width='1.5'/><line x1='200' y1='150' x2='250' y2='210' stroke='%23f10e61' stroke-width='1.5'/><circle cx='100' cy='60' r='8' fill='%23f10ead'/><circle cx='200' cy='150' r='12' fill='%23813ef4' stroke='%23130330' stroke-width='3'/><circle cx='300' cy='80' r='8' fill='%23813ef4'/><circle cx='150' cy='210' r='6' fill='%232196f3'/><circle cx='250' cy='210' r='6' fill='%23f10e61'/></g></svg>",
    // SVG 3: Data stacks / DB representation
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250' fill='none'><rect width='400' height='250' fill='%23130330'/><g opacity='0.4' transform='translate(150, 45)'><path d='M0 20 C0 10 30 0 50 0 C70 0 100 10 100 20 L100 50 C100 60 70 70 50 70 C30 70 0 60 0 50 Z' fill='%23813ef4' fill-opacity='0.3' stroke='%23813ef4' stroke-width='1.5'/><path d='M0 50 C0 60 30 70 50 70 C70 70 100 60 100 50 L100 80 C100 90 70 100 50 100 C30 100 0 90 0 80 Z' fill='%23f10ead' fill-opacity='0.3' stroke='%23f10ead' stroke-width='1.5'/><path d='M0 80 C0 90 30 100 50 100 C70 100 100 90 100 80 L100 110 C100 120 70 130 50 130 C30 130 0 120 0 110 Z' fill='%23f10e61' fill-opacity='0.3' stroke='%23f10e61' stroke-width='1.5'/></g></svg>"
];

function ProjectCardItem({
                             item,
                             index,
                             themeColor,
                             onItemClick,
                             t
                         }: {
    item: ProjectItem;
    index: number;
    themeColor: string;
    onItemClick?: (item: ProjectItem) => void;
    t: any;
}) {
    const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

    const projectImages = [...(item.images || [])];
    while (projectImages.length < 3) {
        const nextDefault = DEFAULT_TECH_SVGS[projectImages.length % DEFAULT_TECH_SVGS.length];
        projectImages.push(nextDefault);
    }
    const displayImages = projectImages.slice(0, 3);

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            onClick={() => onItemClick && onItemClick(item)}
            className={`group relative flex flex-col border border-text/10 bg-text/[0.01] hover:bg-text/[0.02] rounded-none overflow-hidden cursor-pointer transition-all duration-500 hover:border-current ${themeColor}`}
        >
            {/* Top Line accent */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-current opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

            {/* Image/Visual Area - Accordion Layout (No Hover Blur Overlay) */}
            <div className="relative w-full aspect-video bg-text/5 overflow-hidden border-b border-text/10 flex">
                {displayImages.map((img, imgIdx) => {
                    let widthVal = "33.333%";
                    if (hoveredColumn !== null) {
                        widthVal = hoveredColumn === imgIdx ? "55%" : "22.5%";
                    }

                    return (
                        <motion.div
                            key={imgIdx}
                            onMouseEnter={() => setHoveredColumn(imgIdx)}
                            onMouseLeave={() => setHoveredColumn(null)}
                            animate={{ width: widthVal }}
                            transition={{ type: "spring", stiffness: 160, damping: 18 }}
                            className="h-full relative overflow-hidden border-r border-text/10 last:border-r-0 z-10"
                        >
                            <img
                                src={img}
                                alt={`${item.title} preview ${imgIdx + 1}`}
                                className="w-full h-full object-cover select-none pointer-events-none"
                            />
                            {/* Subtle overlay to dim unhovered columns */}
                            <div
                                className={`absolute inset-0 bg-background transition-opacity duration-300 pointer-events-none ${
                                    hoveredColumn !== null && hoveredColumn !== imgIdx ? "opacity-35" : "opacity-0"
                                }`}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Compact Text Area (approx. 1:16 height ratio, just Title and Description) */}
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-text/[0.01]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-text">
                    {item.title}
                </h3>
                <p className="text-xs text-text/50 max-w-lg sm:text-right line-clamp-1 font-mono uppercase tracking-tight">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function ProjectCards({ id, title, items, onItemClick, themeColor = "text-primary" }: ProjectCardsProps) {
    const { t } = useTranslation();

    return (
        <div id={id} className="w-full mt-24 px-4 md:px-8">
            {/* Section Title */}
            <div className="mb-8 max-w-[1920px] mx-auto border-b border-text/10 pb-4">
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] opacity-60">
                    {title}
                </h2>
            </div>

            {/* Grid Container */}
            <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.map((item, index) => (
                    <ProjectCardItem
                        key={item.id || index}
                        item={item}
                        index={index}
                        themeColor={themeColor}
                        onItemClick={onItemClick}
                        t={t}
                    />
                ))}
            </div>
        </div>
    );
}
