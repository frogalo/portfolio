import React from "react";
import prisma from "@/lib/db";
import HomeContent from "./home-content";

// Types for fallbacks
import projectsData from "./data/projects.json";
import experienceData from "./data/experience.json";

interface BilingualString {
    en: string;
    pl: string;
    isBilingual: true;
}

type I18nString = string | BilingualString;

interface Role {
    title: I18nString;
    period: string;
    skills?: string;
    responsibilities?: string[];
}

export default async function Page() {
    let projects: any[] = [];
    let experience: any[] = [];
    let education: any[] = [];

    try {
        // 1. Fetch from Database
        const dbProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
        const dbExperience = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
        const dbEducation = await prisma.education.findMany({ orderBy: { createdAt: 'desc' } });

        // 2. Map DB entries to the expected format
        projects = dbProjects.map((p) => ({
            id: p.id,
            title: { en: p.titleEn, pl: p.titlePl, isBilingual: true },
            description: { en: p.descriptionEn, pl: p.descriptionPl, isBilingual: true },
            category: { en: p.categoryEn, pl: p.categoryPl, isBilingual: true },
            websiteUrl: p.websiteUrl,
            year: p.year || undefined,
            tech: JSON.parse(p.tech) as { name: string }[],
            details: p.detailsEn ? { en: p.detailsEn, pl: p.detailsPl, isBilingual: true } : undefined,
            images: JSON.parse(p.images) as string[]
        }));

        experience = dbExperience.map((e) => {
            const rolesEn = JSON.parse(e.rolesEn || "[]") as any[];
            const rolesPl = JSON.parse(e.rolesPl || "[]") as any[];
            const roles = rolesEn.map((r, idx) => ({
                title: { en: r.title, pl: rolesPl[idx]?.title || r.title, isBilingual: true },
                period: r.period,
                skills: r.skills,
                responsibilities: r.responsibilities
            }));
            return {
                type: "experience" as const,
                company: e.company,
                logo: e.logo || undefined,
                roles,
                skills: e.skills || undefined
            };
        });

        education = dbEducation.map((e) => ({
            type: "education" as const,
            university: e.university,
            logo: e.logo || undefined,
            degree: { en: e.degreeEn, pl: e.degreePl, isBilingual: true },
            period: e.period,
            skills: e.skillsEn ? { en: e.skillsEn, pl: e.skillsPl, isBilingual: true } : undefined
        }));
    } catch (error) {
        console.error("Database fetch failed, falling back to JSON data:", error);
    }

    // 3. Fallback to JSON if DB is empty or fetch failed
    const finalProjects = projects.length > 0 ? projects : projectsData as any;
    const finalExpAndEdu = [...experience, ...education].length > 0 
        ? [...experience, ...education] 
        : experienceData as any;

    return <HomeContent initialProjects={finalProjects} initialExperience={finalExpAndEdu} />;
}