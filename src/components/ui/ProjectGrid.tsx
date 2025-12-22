"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";

interface GridItemProps {
    index: number;
    year?: string;
    category?: string;
    title: string;
    description: string;
    tag?: string;
    themeColor?: string; // e.g. "text-primary", "text-secondary", "text-accent"
    logo?: string;
    invertOnDark?: boolean;
    hoverTags?: string[];
    onClick?: () => void;
    // Data fields to pass to Modal (optional here, but needed for identifying item)
    details?: string;
    images?: string[];
    websiteUrl?: string | null;
}

const OrbitingTags = ({ tags }: { tags: string[] }) => {
    if (!tags || tags.length === 0) return null;

    // Radius for the orbit (adjust based on item size, e.g., 150px)
    const radius = 160;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                className="relative w-0 h-0"
            >
                {tags.slice(0, 8).map((tag, i) => {
                    const angle = (i / Math.min(tags.length, 8)) * 360;
                    const radian = (angle * Math.PI) / 180;
                    const x = Math.cos(radian) * radius;
                    const y = Math.sin(radian) * radius;

                    return (
                        <div key={i} className="absolute top-0 left-0 w-0 h-0">
                            {/* Connecting Line */}
                            <svg className="absolute top-0 left-0 overflow-visible" style={{ width: 0, height: 0 }}>
                                <line
                                    x1={0}
                                    y1={0}
                                    x2={x}
                                    y2={y}
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="opacity-20"
                                />
                            </svg>

                            {/* Tag Box */}
                            <div
                                className="absolute flex items-center justify-center"
                                style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
                            >
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                                    className="w-20 h-20 border border-current bg-background/90 backdrop-blur-sm flex items-center justify-center p-2 text-center text-[10px] font-mono leading-tight shadow-lg"
                                >
                                    {tag}
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

const AutoScrollDescription = ({ text }: { text: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (containerRef.current && textRef.current) {
            const containerHeight = containerRef.current.offsetHeight;
            const textHeight = textRef.current.offsetHeight;
            if (textHeight > containerHeight) {
                setShouldScroll(true);
                // Calculate duration based on scroll distance (e.g., 20px per second)
                setDuration((textHeight - containerHeight) / 20);
            } else {
                setShouldScroll(false);
            }
        }
    }, [text]);

    return (
        <div
            ref={containerRef}
            className="relative h-[6em] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                initial={{ y: 0 }}
                animate={isHovered && shouldScroll ? { y: -(textRef.current?.offsetHeight || 0) + (containerRef.current?.offsetHeight || 0) } : { y: 0 }}
                transition={{ duration: duration, ease: "linear" }}
            >
                <p ref={textRef} className="text-sm opacity-80 text-text/80">
                    {text}
                </p>
            </motion.div>

            {/* Gradient Mask for Overflow */}
            {shouldScroll && (
                <div
                    className={`absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                />
            )}
        </div>
    );
};

const GridItem = ({ index, year, category, title, description, tag, themeColor = "text-primary", logo, invertOnDark, hoverTags, onClick }: GridItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onClick={onClick}
            className={`group relative flex flex-col justify-between p-6 border-b border-r border-current/20 min-h-[300px] hover:bg-current/5 transition-colors duration-300 ${themeColor} hover:z-50`}
        >
            {/* Orbiting Tags Overlay */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-75">
                <OrbitingTags tags={hoverTags || []} />
            </div>

            <div className="flex justify-between items-start text-xs font-mono opacity-60 mb-8">
                {logo ? (
                    <div className="relative w-12 h-12">
                        {/* Colored Mask Layer (Visible by default, hidden on hover) */}
                        <div
                            className="absolute inset-0 bg-current transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                            style={{
                                maskImage: `url(${logo})`,
                                WebkitMaskImage: `url(${logo})`,
                                maskSize: 'contain',
                                WebkitMaskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskPosition: 'center'
                            }}
                        />
                        {/* Original Color Layer (Hidden by default, visible on hover) */}
                        <img
                            src={logo}
                            alt={`${title} logo`}
                            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${invertOnDark ? 'dark:invert' : ''}`}
                        />
                    </div>
                ) : (
                    <span>{year || `0${index + 1}`}</span>
                )}
                <span>{category}</span>
            </div>

            <div className="flex flex-col gap-4 relative z-10">
                <h3 className="text-2xl font-bold">{title}</h3>
                <AutoScrollDescription text={description} />
            </div>

            <div className="mt-8 text-xs font-mono uppercase tracking-widest opacity-50 z-10">
                {tag}
            </div>
        </motion.div>
    );
};

interface ProjectGridProps {
    id?: string;
    title?: string;
    themeColor?: string; // Tailwind text color class, e.g. "text-primary"
    items: {
        id?: string; // Add id to items
        title: string;
        description: string;
        year?: string;
        category?: string;
        tag?: string;
        logo?: string;
        invertOnDark?: boolean;
        hoverTags?: string[];
        details?: string;
        images?: string[];
        websiteUrl?: string | null;
    }[];
    onItemClick?: (item: any) => void;
}

export default function ProjectGrid({ id, title, themeColor = "text-primary", items, onItemClick }: ProjectGridProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start center"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    // Expandable Grid Logic
    const [columns, setColumns] = useState(4); // Default to desktop
    const [visibleSlots, setVisibleSlots] = useState(8); // Default 2 rows (4 * 2)

    useEffect(() => {
        const handleResize = () => {
            let newColumns = 4;
            if (window.innerWidth >= 1024) {
                newColumns = 4;
            } else if (window.innerWidth >= 768) {
                newColumns = 2;
            } else {
                newColumns = 1;
            }
            setColumns(newColumns);
            // Reset to 2 rows on resize, or keep current if expanded? 
            // Better to reset or ensure minimum 2 rows. 
            // Let's reset to ensure consistency, or check if we need to adjust.
            // But to avoid resetting while user is browsing on mobile (address bar resize), maybe only if columns changed.
            // For now, let's just set initial visibleSlots based on current columns if it's the first run, 
            // but we need to handle the state update.
            // Actually, simplest is to just ensure visibleSlots is at least 2 rows.

            // Let's just set it to 2 rows on resize for now to be safe and simple.
            setVisibleSlots(newColumns * 2);
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleExpand = () => {
        if (columns === 1) {
            // Mobile: Show 2 more items (plus the slot for the button if needed)
            // Actually, we want to show 2 *more* projects.
            // Current visible items = visibleSlots - 1 (button)
            // We want new visible items = old visible items + 2
            // So new visibleSlots = old visibleSlots + 2
            setVisibleSlots(prev => prev + 2);
        } else {
            // Desktop/Tablet: Show all
            setVisibleSlots(items.length + 1); // +1 to ensure no button needed
        }
    };

    const shouldLimit = items.length > visibleSlots;
    // If we limit, we show (visibleSlots - 1) items + 1 button = visibleSlots total widgets
    const visibleItems = shouldLimit ? items.slice(0, visibleSlots - 1) : items;
    const remainingCount = items.length - visibleItems.length;

    return (
        <div id={id} ref={containerRef} className={`w-full mt-20 ${themeColor}`}>
            {/* Section Header Animation */}
            {title && (
                <div className="overflow-hidden mb-10 px-4 md:px-8">
                    <motion.h2
                        style={{ x, opacity }}
                        className="text-[10vw] md:text-[8vw] font-bold uppercase leading-none tracking-tighter"
                    >
                        {title}
                    </motion.h2>
                </div>
            )}

            <div className="w-full border-t border-l border-current/20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {visibleItems.map((item, idx) => (
                        <GridItem
                            key={idx}
                            index={idx}
                            themeColor={themeColor}
                            {...item}
                            onClick={() => onItemClick && onItemClick(item)}
                        />
                    ))}

                    {/* Expand Card */}
                    {shouldLimit && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{ scale: 0.98 }}
                            onClick={handleExpand}
                            className={`flex flex-col justify-center items-center p-6 border-b border-r border-current/20 min-h-[300px] hover:bg-current/5 transition-colors duration-300 cursor-pointer ${themeColor}`}
                        >
                            <span className="text-6xl font-bold">+{remainingCount}</span>
                            <span className="text-sm uppercase tracking-widest mt-4 opacity-60">
                                {columns === 1 ? "Show More" : "Show All"}
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>


        </div >
    );
}
