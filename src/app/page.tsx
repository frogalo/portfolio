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

interface ProjectEntry {
    id: string;
    title: I18nString;
    description: I18nString;
    category: I18nString;
    websiteUrl: string | null;
    year?: string;
    tech: { name: string }[];
    details?: I18nString;
    images?: string[];
}

interface CompanyExperience {
    id: string;
    type: "experience";
    companyEn: string;
    companyPl: string;
    logo?: string;
    roles: Role[];
    skills?: string;
}

interface EducationEntry {
    id: string;
    type: "education";
    universityEn: string;
    universityPl: string;
    logo?: string;
    degree: I18nString;
    period: string;
    skills?: I18nString;
}

type ExperienceOrEducation = CompanyExperience | EducationEntry;

type SortableProject = {
    year?: string;
};

type SortableExperience = {
    type: "experience";
    roles?: Array<{ period?: string }>;
};

type SortableEducation = {
    type: "education";
    period?: string;
};

type SortableExperienceOrEducation = SortableExperience | SortableEducation;

const monthMap: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
};

function toBilingualString(en: string, pl?: string | null): BilingualString {
    return {
        en,
        pl: pl ?? en,
        isBilingual: true,
    };
}

function parseProjectYear(year?: string): number {
    if (!year) {
        return Number.NEGATIVE_INFINITY;
    }

    const parsedYear = Number.parseInt(year, 10);
    return Number.isNaN(parsedYear) ? Number.NEGATIVE_INFINITY : parsedYear;
}

function parsePeriodDateValue(period?: string): number {
    if (!period) {
        return Number.NEGATIVE_INFINITY;
    }

    const normalized = period.replace(/â€“|–|—/g, "-");
    const segments = normalized
        .split("-")
        .map((segment) => segment.trim())
        .filter(Boolean);

    const endSegment = segments[segments.length - 1] ?? "";
    if (/present/i.test(endSegment)) {
        return Number.MAX_SAFE_INTEGER;
    }

    const tokens = endSegment.split(/\s+/).filter(Boolean);
    const yearToken = [...tokens].reverse().find((token) => /\d{4}/.test(token));
    const year = yearToken ? Number.parseInt(yearToken, 10) : Number.NaN;

    if (Number.isNaN(year)) {
        return Number.NEGATIVE_INFINITY;
    }

    const monthToken = tokens.find((token) => monthMap[token.slice(0, 3).toLowerCase()] !== undefined);
    const month = monthToken ? monthMap[monthToken.slice(0, 3).toLowerCase()] : 11;

    return new Date(year, month, 1).getTime();
}

function sortProjectsByDate<T extends SortableProject>(projects: T[]): T[] {
    return [...projects].sort((left, right) => parseProjectYear(right.year) - parseProjectYear(left.year));
}

function sortExperienceAndEducationByDate<T extends SortableExperienceOrEducation>(entries: T[]): T[] {
    return [...entries].sort((left, right) => {
        const leftPeriod = left.type === "experience" ? left.roles?.[0]?.period : left.period;
        const rightPeriod = right.type === "experience" ? right.roles?.[0]?.period : right.period;

        return parsePeriodDateValue(rightPeriod) - parsePeriodDateValue(leftPeriod);
    });
}

export default async function Page() {
    let projects: ProjectEntry[] = [];
    let experience: CompanyExperience[] = [];
    let education: EducationEntry[] = [];

    try {
        // 1. Fetch from Database
        const dbProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
        const dbExperience = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
        const dbEducation = await prisma.education.findMany({ orderBy: { createdAt: 'desc' } });

        // 2. Map DB entries to the expected format
        projects = dbProjects.map((p) => ({
            id: p.id,
            title: toBilingualString(p.titleEn, p.titlePl),
            description: toBilingualString(p.descriptionEn, p.descriptionPl),
            category: toBilingualString(p.categoryEn, p.categoryPl),
            websiteUrl: p.websiteUrl,
            year: p.year || undefined,
            tech: JSON.parse(p.tech) as { name: string }[],
            details: p.detailsEn ? toBilingualString(p.detailsEn, p.detailsPl) : undefined,
            images: JSON.parse(p.images) as string[]
        }));

        experience = dbExperience.map((e) => {
            const rolesEn = JSON.parse(e.rolesEn || "[]") as any[];
            const rolesPl = JSON.parse(e.rolesPl || "[]") as any[];
            const roles = rolesEn.map((r, idx) => ({
                title: toBilingualString(r.title, rolesPl[idx]?.title),
                period: r.period,
                skills: r.skills,
                responsibilities: r.responsibilities
            }));
            return {
                type: "experience" as const,
                id: e.id,
                companyEn: e.companyEn,
                companyPl: e.companyPl,
                logo: e.logo || undefined,
                roles,
                skills: e.skills || undefined
            };
        });

        education = dbEducation.map((e) => ({
            type: "education" as const,
            id: e.id,
            universityEn: e.universityEn,
            universityPl: e.universityPl,
            logo: e.logo || undefined,
            degree: toBilingualString(e.degreeEn, e.degreePl),
            period: e.period,
            skills: e.skillsEn ? toBilingualString(e.skillsEn, e.skillsPl) : undefined
        }));
    } catch (error) {
        console.error("Database fetch failed, falling back to JSON data:", error);
    }

    // 3. Fallback to JSON if DB is empty or fetch failed
    const finalProjects = sortProjectsByDate(projects.length > 0 ? projects : projectsData as ProjectEntry[]);
    const finalExpAndEdu = [...experience, ...education].length > 0 
        ? sortExperienceAndEducationByDate<ExperienceOrEducation>([...experience, ...education])
        : sortExperienceAndEducationByDate(experienceData as ExperienceOrEducation[]);

    return <HomeContent initialProjects={finalProjects} initialExperience={finalExpAndEdu} />;
}
