"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
        disableUrl?: boolean;
        isMobile?: boolean;
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

    // Close on Escape key (only if lightbox is not active)
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && activeImageIndex === null) onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    // Reset loading state when project ID changes
    useEffect(() => {
        setLoadingImages({});
        setActiveImageIndex(null);
    }, [project?.id]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (activeImageIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveImageIndex(null);
                e.stopPropagation();
            }
            if (e.key === "ArrowLeft" && activeImageIndex > 0) {
                setActiveImageIndex(prev => prev! - 1);
            }
            if (e.key === "ArrowRight" && project?.images && activeImageIndex < project.images.length - 1) {
                setActiveImageIndex(prev => prev! + 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown, true);
        return () => window.removeEventListener("keydown", handleKeyDown, true);
    }, [activeImageIndex, project?.images]);

    const handleImageLoad = (idx: number) => {
        setLoadingImages(prev => ({ ...prev, [idx]: false }));
    };

    if (!project) return null;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-background/85 backdrop-blur-md cursor-pointer"
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`project-${project.title}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl max-h-[90vh] bg-background border border-current/20 shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col md:flex-row rounded-none"
                            style={{ color: "var(--foreground)" }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 hover:bg-current/10 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            {/* Left Side: Images (Desktop) / Top (Mobile) */}
                            <div className={`w-full md:w-1/2 bg-current/5 p-6 hidden md:flex gap-4 overflow-y-auto h-full order-last md:order-first ${project.isMobile ? 'flex-row flex-wrap justify-center items-center' : 'flex-col'}`}>
                                {project.images && project.images.length > 0 ? (
                                    project.images.map((img, idx) => (
                                        project.isMobile ? (
                                            <div 
                                                key={idx} 
                                                onClick={() => setActiveImageIndex(idx)}
                                                className="relative w-[180px] aspect-[9/16] border border-current/15 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.015] transition-all duration-300 flex items-center justify-center bg-current/5 overflow-hidden group cursor-zoom-in"
                                            >
                                                {loadingImages[idx] !== false && (
                                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                                        <Loader2 className="animate-spin opacity-50" size={24} />
                                                    </div>
                                                )}
                                                <img
                                                    src={img}
                                                    alt={`${project.title} screenshot ${idx + 1}`}
                                                    className={`w-full h-full object-cover transition-opacity duration-300 ${loadingImages[idx] !== false ? 'opacity-0' : 'opacity-100'}`}
                                                    onLoad={() => handleImageLoad(idx)}
                                                />
                                            </div>
                                        ) : (
                                            <div 
                                                 key={idx} 
                                                 onClick={() => setActiveImageIndex(idx)}
                                                 className="relative w-full border border-current/10 aspect-video shrink-0 flex items-center justify-center bg-current/5 group cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
                                             >
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
                                        )
                                    ))
                                ) : (
                                    // Fallback placeholder if no images
                                    <div className="w-full h-64 md:h-full flex items-center justify-center opacity-20 border border-dashed border-current">
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

                                {/* Mobile Images Thumbnails strip (visible only on mobile) */}
                                {project.images && project.images.length > 0 && (
                                    <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-current/10">
                                        {project.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setActiveImageIndex(idx)}
                                                className={`relative border border-current/20 flex-shrink-0 bg-current/5 cursor-zoom-in ${project.isMobile ? 'w-12 h-20 rounded-md' : 'w-20 h-14'}`}
                                            >
                                                <img
                                                    src={img}
                                                    alt="thumbnail"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Tags */}
                                {project.hoverTags && project.hoverTags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                                        {project.hoverTags.slice(0, 5).map((tag, i) => (
                                            <span key={i} className="px-2.5 py-0.5 text-[9px] font-mono uppercase border border-current/20 rounded-none opacity-70">
                                                {tag}
                                            </span>
                                        ))}
                                        {project.hoverTags.length > 5 && (
                                            <div className="relative group">
                                                <span className="cursor-help px-2.5 py-0.5 text-[9px] font-mono uppercase border border-current/20 rounded-none opacity-70 hover:opacity-100 hover:bg-current/10 transition-all">
                                                    +{project.hoverTags.length - 5}
                                                </span>
                                                {/* Tooltip */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 hidden group-hover:flex flex-col gap-1 p-2 bg-background/95 backdrop-blur-md border border-current/20 rounded-none shadow-xl z-50">
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
                                                        className="flex gap-3 items-start p-3 border-l border-current bg-current/[0.02] hover:bg-current/5 transition-colors group rounded-none"
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
                                    {project.websiteUrl && !project.disableUrl ? (
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
                                            {/* Action placeholder */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Lightbox Modal for screenshots */}
            <AnimatePresence>
                {activeImageIndex !== null && project?.images && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex flex-col justify-center items-center p-4 md:p-12 select-none"
                    >
                        {/* Backdrop Click to Close */}
                        <div 
                            className="absolute inset-0 cursor-zoom-out" 
                            onClick={() => setActiveImageIndex(null)}
                        />

                        {/* Top Controls Bar */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50 text-white font-mono text-xs uppercase tracking-widest">
                            <span>
                                {activeImageIndex + 1} / {project.images.length}
                            </span>
                            <button
                                onClick={() => setActiveImageIndex(null)}
                                className="p-2 hover:bg-white/10 transition-colors text-white cursor-pointer"
                                aria-label="Close image viewer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Fullscreen Image Frame */}
                        <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center z-10 pointer-events-none">
                            <motion.img
                                key={activeImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                src={project.images[activeImageIndex]}
                                alt={`${project.title} screenshot large ${activeImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain shadow-2xl border border-white/10"
                            />
                        </div>

                        {/* Left arrow navigator */}
                        {activeImageIndex > 0 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImageIndex(prev => prev! - 1);
                                }}
                                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/15 text-white z-40 transition-all cursor-pointer rounded-none border border-white/10"
                                aria-label="Previous screenshot"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        )}

                        {/* Right arrow navigator */}
                        {activeImageIndex < project.images.length - 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveImageIndex(prev => prev! + 1);
                                }}
                                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/15 text-white z-40 transition-all cursor-pointer rounded-none border border-white/10"
                                aria-label="Next screenshot"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}