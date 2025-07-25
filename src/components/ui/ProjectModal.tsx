"use client";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TechItem {
    name: string;
    isNew?: boolean;
}

interface ProjectModalProps {
    project: {
        id: string;
        title: string;
        description: string; // The short description shown on the card
        tech: TechItem[];
        details: string; // The long details shown in the modal
        images: string[];
        websiteUrl: string | null;
    } | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    // All hooks MUST be called unconditionally at the top level
    const { t } = useTranslation();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    };

    const imagePreviewVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
    };

    // Handle closing image preview
    const closeImagePreview = () => {
        setPreviewImage(null);
    };

    // Now, conditionally render the modal content.
    // The hooks have already been called.
    if (!project) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative bg-[var(--background)] text-[var(--text)] border border-[var(--primary)] rounded-xl shadow-xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-[var(--primary)]/70 hover:text-[var(--primary)] transition-colors duration-200 z-10"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--accent)] text-center">
                        {t(project.title)}
                    </h2>

                    {project.images && project.images.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {project.images.map((imgSrc, index) => (
                                <div
                                    key={index}
                                    className="rounded-md overflow-hidden shadow-md cursor-pointer group relative aspect-video"
                                    onClick={() => setPreviewImage(imgSrc)}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={imgSrc}
                                            alt={`${t(project.title)} image ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ImageIcon className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <p className="text-base md:text-lg text-[var(--text)] leading-relaxed mb-6">
                        {t(project.details)}
                    </p>

                    {project.tech && project.tech.length > 0 && (
                        <div>
                            <h4 className="text-xl font-semibold mb-3 text-[var(--accent)]">
                                Technologies:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((techItem, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-[var(--secondary)] text-[var(--text)] text-sm rounded-full flex items-center gap-1"
                                    >
                                        <span>{techItem.name}</span>
                                        {techItem.isNew && (
                                            <span
                                                className="bg-purple-accent text-[var(--header-txt)] text-xs font-bold px-1 py-0 rounded-full">
                                                New
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {project.websiteUrl && (
                        <div className="mt-8 text-center">
                            <a
                                href={project.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[var(--accent)] text-[var(--primary)] py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[var(--secondary)] text-base md:text-lg font-semibold"
                            >
                                Visit Project
                            </a>
                        </div>
                    )}
                </motion.div>

                {/* Image Preview Modal */}
                <AnimatePresence>
                    {previewImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-60 flex items-center justify-center backdrop-blur-lg bg-black bg-opacity-30 p-4"
                            onClick={closeImagePreview}
                        >
                            <motion.div
                                variants={imagePreviewVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="relative max-w-full max-h-full flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={closeImagePreview}
                                    className="absolute top-2 right-2 md:top-4 md:right-4 text-white/70 hover:text-white transition-colors duration-200 z-10"
                                    aria-label="Close image preview"
                                >
                                    <X size={24} className="md:w-8 md:h-8 text-accent cursor-pointer" />
                                </button>

                                <div className="relative max-w-[90vw] max-h-[90vh]">
                                    <Image
                                        src={previewImage}
                                        alt="Project preview"
                                        width={1920}
                                        height={1080}
                                        className="object-contain max-h-[90vh] w-auto h-auto rounded-lg shadow-xl"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}