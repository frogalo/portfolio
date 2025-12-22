"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        id?: string;
        title: string;
        description: string; // Short description
        details?: string; // Long description
        year?: string;
        category?: string;
        tag?: string;
        logo?: string;
        images?: string[]; // Array of image paths
        websiteUrl?: string | null;
        hoverTags?: string[]; // Tech stack
    } | null;
    themeColor?: string;
}

export default function ProjectModal({ isOpen, onClose, project, themeColor = "text-primary" }: ProjectModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

    // Reset loading state when project ID changes (not on every render/translation change)
    useEffect(() => {
        setLoadingImages({});
    }, [project?.id]);

    const handleImageLoad = (idx: number) => {
        setLoadingImages(prev => ({ ...prev, [idx]: false }));
    };

    const handleImageStart = (idx: number) => {
        setLoadingImages(prev => ({ ...prev, [idx]: true }));
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        layoutId={`project-${project.title}`} // Optional: if we want shared layout animation from grid
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[90vh] bg-background border border-current/20 shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col md:flex-row"
                        style={{ color: "var(--foreground)" }} // Ensure basic text color inheritance if needed
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-current/10 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Left Side: Images (Desktop) / Top (Mobile) */}
                        <div className="w-full md:w-1/2 bg-current/5 p-4 flex flex-col gap-2 overflow-hidden h-full">
                            {project.images && project.images.length > 0 ? (
                                project.images.map((img, idx) => (
                                    <div key={idx} className="relative w-full rounded-lg overflow-hidden shadow-sm border border-current/10 flex-1 hover:flex-[10] transition-all duration-500 ease-in-out min-h-[60px] flex items-center justify-center bg-current/5 group">
                                        {/* Loading Spinner */}
                                        {loadingImages[idx] !== false && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <Loader2 className="animate-spin opacity-50" size={32} />
                                            </div>
                                        )}

                                        <img
                                            src={img}
                                            alt={`${project.title} screenshot ${idx + 1}`}
                                            className={`w-full h-full object-cover transition-opacity duration-300 ${loadingImages[idx] !== false ? 'opacity-0' : 'opacity-100'}`}
                                            onLoad={() => handleImageLoad(idx)}
                                        />
                                    </div>
                                ))
                            ) : (
                                // Fallback placeholder if no images
                                <div className="w-full h-64 md:h-full flex items-center justify-center opacity-20 border border-dashed border-current rounded-lg">
                                    <span className="text-sm font-mono uppercase">No Images Available</span>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Details (Desktop) / Bottom (Mobile) */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col h-1/2 md:h-full overflow-y-auto">
                            {/* Header Info */}
                            <div className={`text-xs font-mono uppercase tracking-widest opacity-60 mb-2 ${themeColor}`}>
                                {project.category}
                            </div>

                            <h2 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${themeColor}`}>
                                {project.title}
                            </h2>

                            {/* Tags */}
                            {project.hoverTags && project.hoverTags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                                    {project.hoverTags.slice(0, 5).map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-[10px] font-mono uppercase border border-current/20 rounded-full opacity-70">
                                            {tag}
                                        </span>
                                    ))}
                                    {project.hoverTags.length > 5 && (
                                        <div className="relative group">
                                            <span className="cursor-help px-3 py-1 text-[10px] font-mono uppercase border border-current/20 rounded-full opacity-70 hover:opacity-100 hover:bg-current/10 transition-all">
                                                +{project.hoverTags.length - 5}
                                            </span>
                                            {/* Tooltip */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 hidden group-hover:flex flex-col gap-1 p-2 bg-background/95 backdrop-blur-md border border-current/20 rounded-lg shadow-xl z-50">
                                                {project.hoverTags.slice(5).map((tag, i) => (
                                                    <span key={i} className="text-[10px] font-mono uppercase opacity-80 px-2 py-1 hover:bg-current/10 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Descriptions */}
                            <div className="prose prose-lg dark:prose-invert max-w-none mb-8 opacity-90">
                                <p className="font-medium text-lg leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                {project.details && (
                                    <div className="flex flex-col gap-3">
                                        {project.details.split('\n').map((line, i) => {
                                            const cleanLine = line.replace(/^-\s*/, '').trim();
                                            if (!cleanLine) return null;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex gap-3 items-start p-3 rounded-lg bg-current/5 hover:bg-current/10 transition-colors group"
                                                >
                                                    <div className="mt-1 min-w-4 text-current/50 group-hover:text-current/80 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="9 11 12 14 22 4"></polyline>
                                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm leading-relaxed">{cleanLine}</span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Footer / Actions */}
                            <div className="mt-auto pt-8 border-t border-current/10 flex items-center justify-between">
                                {project.websiteUrl ? (
                                    <a
                                        href={project.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 px-6 py-3 bg-current/10 hover:bg-current/20 transition-colors rounded-none font-bold uppercase tracking-wider text-xs ${themeColor}`}
                                    >
                                        Visit Live Site
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </a>
                                ) : (
                                    <div className="opacity-40 text-xs font-mono uppercase">

                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}