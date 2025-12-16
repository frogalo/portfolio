"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface GridItemProps {
    index: number;
    year?: string;
    category?: string;
    title: string;
    description: string;
    tag?: string;
    themeColor?: string; // e.g. "text-primary", "text-secondary", "text-accent"
}

const GridItem = ({ index, year, category, title, description, tag, themeColor = "text-primary" }: GridItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className={`flex flex-col justify-between p-6 border-b border-r border-current/20 min-h-[300px] hover:bg-current/5 transition-colors duration-300 ${themeColor}`}
        >
            <div className="flex justify-between items-start text-xs font-mono opacity-60 mb-8">
                <span>{year || `0${index + 1}`}</span>
                <span>{category}</span>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-sm opacity-80 line-clamp-3 text-text/80">{description}</p>
            </div>

            <div className="mt-8 text-xs font-mono uppercase tracking-widest opacity-50">
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
        title: string;
        description: string;
        year?: string;
        category?: string;
        tag?: string;
    }[];
}

export default function ProjectGrid({ id, title, themeColor = "text-primary", items }: ProjectGridProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start center"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

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
                    {items.map((item, idx) => (
                        <GridItem key={idx} index={idx} themeColor={themeColor} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
