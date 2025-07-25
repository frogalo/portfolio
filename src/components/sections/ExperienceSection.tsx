"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase } from 'lucide-react'; // GraduationCap might be useful for education
import Image from 'next/image';
import experienceData from "../../app/data/experience.json"; // Import the new JSON file

// Define interfaces for better type safety
interface Role {
    title: string;
    location?: string;
    period: string;
    responsibilities: string[];
    skills: string; // This string will be split into an array for tags
}

interface CompanyExperience {
    type: "experience";
    company: string;
    logo?: string;
    roles: Role[];
}

interface EducationEntry {
    type: "education";
    university: string;
    logo?: string;
    degree: string;
    period: string;
    skills: string; // This string will be split into an array for tags
}

// Union type for all possible entries in the JSON
type ExperienceOrEducation = CompanyExperience | EducationEntry;

export default function ExperienceSection() {
    const { t } = useTranslation();

    // Filter data directly from the imported JSON
    const experience: CompanyExperience[] = (experienceData as ExperienceOrEducation[]).filter(
        (entry): entry is CompanyExperience => entry.type === "experience"
    );

    const education: EducationEntry[] = (experienceData as ExperienceOrEducation[]).filter(
        (entry): entry is EducationEntry => entry.type === "education"
    );

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-8"
        >
            <h2 className="text-4xl font-bold mb-8 border-b-2 border-primary pb-3 text-primary text-center">
                {t("Experience")}
            </h2>
            <div className="space-y-10">
                {experience.map((companyExp, companyIndex) => (
                    <div key={companyIndex} className="bg-primary-lighter p-6 rounded-xl shadow-md border-l-4 border-accent">
                        <div className="flex items-center gap-4 mb-4">
                            {/* Company Logo - Removed rounded-full */}
                            {companyExp.logo && (
                                <Image
                                    src={companyExp.logo}
                                    alt={`${companyExp.company} logo`}
                                    width={48}
                                    height={48}
                                    className="object-contain" // Changed to object-contain, removed rounded-full
                                />
                            )}
                            <div>
                                <h3 className="text-2xl font-bold text-primary">{t(companyExp.company)}</h3>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {companyExp.roles.map((role, roleIndex) => (
                                <motion.div
                                    key={`${companyIndex}-${roleIndex}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: (companyIndex * 0.1) + (roleIndex * 0.1) }}
                                >
                                    <div className="flex flex-wrap justify-between items-start mb-2">
                                        <h4 className="text-xl font-semibold text-accent flex items-center gap-2">
                                            <Briefcase size={20} className="text-primary" />
                                            {t(role.title)}
                                        </h4>
                                        <span className="bg-secondary px-3 py-1 rounded-full text-sm text-text">
                                            {role.period}
                                        </span>
                                    </div>
                                    {role.location && (
                                        <p className="text-sm text-gray-400 mb-2">{t(role.location)}</p>
                                    )}
                                    <ul className="list-disc list-inside text-primary text-sm space-y-1 mb-3">
                                        {role.responsibilities.map((resp, i) => (
                                            <li key={i}>{t(resp)}</li>
                                        ))}
                                    </ul>
                                    {/* Skills as individual tags */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {t(role.skills).split(',').map((skill, i) => (
                                            <span key={i} className="px-3 py-1 bg-secondary text-text text-xs rounded-md">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Education Section */}
            <h2 className="text-4xl font-bold mt-12 mb-8 border-b-2 border-primary pb-3 text-primary text-center">
                {t("Education")}
            </h2>
            <div className="space-y-10">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        className="bg-primary-lighter p-6 rounded-xl shadow-md border-l-4 border-accent"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            {edu.logo && (
                                <Image
                                    src={edu.logo}
                                    alt={`${edu.university} logo`}
                                    width={48}
                                    height={48}
                                    className="object-contain" // Changed to object-contain, removed rounded-full
                                />
                            )}
                            <div>
                                <h3 className="text-2xl font-bold text-primary">{t(edu.university)}</h3>
                                <p className="text-accent text-lg">{t(edu.degree)}</p>
                                <p className="text-sm text-text/70">{edu.period}</p>
                            </div>
                        </div>
                        {/* Skills as individual tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {t(edu.skills).split(',').map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-secondary text-text text-xs rounded-md">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}