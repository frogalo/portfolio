'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveExperience(formData: FormData) {
    const id = formData.get('id') as string;
    const company = formData.get('company') as string;
    const logoRaw = formData.get('logo') as string;
    
    // ImageUploader sends a JSON array; extract first path as logo
    let logo: string | null = null;
    try { const arr = JSON.parse(logoRaw); logo = arr[0] ?? null; } catch { logo = logoRaw || null; }
    
    const skills = formData.get('skills') as string;
    
    const roleTitleEn = formData.get('roleTitleEn') as string;
    const roleTitlePl = formData.get('roleTitlePl') as string;
    const rolePeriod = formData.get('rolePeriod') as string;

    const responsibilitiesEnRaw = formData.get('responsibilitiesEn') as string;
    const responsibilitiesPlRaw = formData.get('responsibilitiesPl') as string;

    const responsibilitiesEn = responsibilitiesEnRaw ? responsibilitiesEnRaw.split('\n').filter(Boolean) : [];
    const responsibilitiesPl = responsibilitiesPlRaw ? responsibilitiesPlRaw.split('\n').filter(Boolean) : [];

    // We store the roles as JSON arrays of objects
    const rolesEn = [{
        title: roleTitleEn,
        period: rolePeriod,
        skills: skills,
        responsibilities: responsibilitiesEn
    }];

    const rolesPl = [{
        title: roleTitlePl,
        period: rolePeriod,
        skills: skills,
        responsibilities: responsibilitiesPl
    }];

    const data = {
        company,
        logo,
        skills,
        rolesEn: JSON.stringify(rolesEn),
        rolesPl: JSON.stringify(rolesPl),
    };

    if (id) {
        await prisma.experience.update({
            where: { id },
            data,
        });
    } else {
        await prisma.experience.create({
            data,
        });
    }

    revalidatePath('/admin/experience');
    revalidatePath('/');
}

export async function deleteExperience(id: string) {
    await prisma.experience.delete({
        where: { id },
    });

    revalidatePath('/admin/experience');
    revalidatePath('/');
}
