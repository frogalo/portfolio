'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveEducation(formData: FormData) {
    const id = formData.get('id') as string;
    const university = formData.get('university') as string;
    const degreeEn = formData.get('degreeEn') as string;
    const degreePl = formData.get('degreePl') as string;
    const period = formData.get('period') as string;
    const logoRaw = formData.get('logo') as string;
    
    let logo: string | null = null;
    try { const arr = JSON.parse(logoRaw); logo = arr[0] ?? null; } catch { logo = logoRaw || null; }
    
    const skillsEn = formData.get('skillsEn') as string;
    const skillsPl = formData.get('skillsPl') as string;

    const data = {
        university,
        degreeEn,
        degreePl,
        period,
        logo,
        skillsEn,
        skillsPl,
    };

    if (id) {
        await prisma.education.update({
            where: { id },
            data,
        });
    } else {
        await prisma.education.create({
            data,
        });
    }

    revalidatePath('/admin/education');
    revalidatePath('/');
}

export async function deleteEducation(id: string) {
    await prisma.education.delete({
        where: { id },
    });

    revalidatePath('/admin/education');
    revalidatePath('/');
}
