"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface WorkItem {
    id: string;
    year: string;
    category: string;
    title: string; // Company / University Name
    description: string; // Role Title / Degree Name
    tag: string; // Period / Dates
    logo?: string;
    invertOnDark?: boolean;
    hoverTags?: string[];
    details?: string;
    images?: string[];
    websiteUrl?: string | null;
}

interface WorkListProps {
    id?: string;
    title: string;
    items: WorkItem[];
    onItemClick?: (item: WorkItem) => void;
    themeColor?: string; // Tailwind text color class, e.g. "text-primary"
}

export default function WorkList({ id, title, items, onItemClick, themeColor = "text-text" }: WorkListProps) {
    const { t } = useTranslation();

    return (
        <div id={id} className="w-full mt-24 px-4 md:px-8">
            {/* Section Title */}
            <div className="mb-6 max-w-[1920px] mx-auto border-b border-text/10 pb-4">
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] opacity-60">
                    {title}
                </h2>
            </div>

            {/* List Container */}
            <div className="w-full max-w-[1920px] mx-auto flex flex-col">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        onClick={() => onItemClick && onItemClick(item)}
                        className="group relative flex flex-col md:flex-row justify-between py-10 border-b border-text/10 hover:bg-text/[0.02] cursor-pointer transition-colors duration-300 px-4 md:px-6"
                    >
                        {/* Hover Overlay Line */}
                        <div className={`absolute left-0 top-0 w-[2px] h-0 bg-current transition-all duration-300 group-hover:h-full ${themeColor}`} />

                        {/* Left Side: Metadata & Logo (1/3 width on desktop) */}
                        <div className="w-full md:w-1/3 flex flex-col gap-4 pr-4">
                            <div className="flex items-center gap-4">
                                {item.logo && (
                                    <div className="relative w-8 h-8 flex-shrink-0">
                                        <div
                                            className="absolute inset-0 bg-current transition-opacity duration-300 opacity-80 group-hover:opacity-0"
                                            style={{
                                                maskImage: `url(${item.logo})`,
                                                WebkitMaskImage: `url(${item.logo})`,
                                                maskSize: 'contain',
                                                WebkitMaskSize: 'contain',
                                                maskRepeat: 'no-repeat',
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskPosition: 'center',
                                                WebkitMaskPosition: 'center'
                                            }}
                                        />
                                        <img
                                            src={item.logo}
                                            alt={`${item.title} logo`}
                                            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${item.invertOnDark ? 'dark:invert' : ''}`}
                                        />
                                    </div>
                                )}
                                <h3 className={`text-xl font-bold uppercase tracking-tight text-text group-hover:${themeColor} transition-colors duration-300`}>
                                    {item.title}
                                </h3>
                            </div>

                            {/* Tech Stack / Skills Badges */}
                            {item.hoverTags && item.hoverTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {item.hoverTags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-0.5 border border-text/15 text-[9px] font-mono uppercase rounded-full tracking-wider opacity-65 group-hover:opacity-100 group-hover:border-current/40 transition-all duration-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Side: Position Details & Date (2/3 width on desktop) */}
                        <div className="w-full md:w-2/3 flex flex-col md:flex-row justify-between items-start gap-4 mt-6 md:mt-0">
                            <div className="flex flex-col gap-2 max-w-xl">
                                <h4 className="text-lg font-semibold text-text opacity-95">
                                    {item.description}
                                </h4>
                                {item.details && (
                                    <p className="text-sm text-text/60 line-clamp-2 leading-relaxed group-hover:text-text/85 transition-colors duration-300">
                                        {item.details.split('\n')[0].replace(/^-\s*/, '')}
                                    </p>
                                )}
                            </div>

                            {/* Date & Trigger */}
                            <div className="flex flex-col items-start md:items-end gap-2 shrink-0 md:text-right mt-2 md:mt-0">
                                <span className="text-xs font-mono uppercase tracking-wider opacity-50">
                                    {item.tag}
                                </span>
                                <span className={`text-xs font-mono uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 ${themeColor}`}>
                                    {t("readMore", "Read Details →")}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
