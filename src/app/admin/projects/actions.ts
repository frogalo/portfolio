'use server';

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveProject(formData: FormData) {
    const id = formData.get('id') as string;
    const titleEn = formData.get('titleEn') as string;
    const titlePl = formData.get('titlePl') as string;
    const descriptionEn = formData.get('descriptionEn') as string;
    const descriptionPl = formData.get('descriptionPl') as string;
    const categoryEn = formData.get('categoryEn') as string;
    const categoryPl = formData.get('categoryPl') as string;
    const websiteUrl = formData.get('websiteUrl') as string;
    const year = formData.get('year') as string;
    const detailsEn = formData.get('detailsEn') as string;
    const detailsPl = formData.get('detailsPl') as string;
    const techRaw = formData.get('tech') as string;
    const imagesRaw = formData.get('images') as string;
    
    let images = [];
    try { images = JSON.parse(imagesRaw); } catch { images = imagesRaw ? [imagesRaw] : []; }

    // Handle tech stack parsing (it might be already JSON or a comma string)
    let tech = techRaw;
    if (!techRaw.trim().startsWith('[')) {
        tech = JSON.stringify(techRaw.split(',').map(name => ({ name: name.trim() })));
    }

    const data = {
        titleEn,
        titlePl,
        descriptionEn,
        descriptionPl,
        categoryEn,
        categoryPl,
        websiteUrl: websiteUrl || null,
        year,
        detailsEn,
        detailsPl,
        tech,
        images: JSON.stringify(images),
    };

    if (id) {
        await prisma.project.update({
            where: { id },
            data,
        });
    } else {
        await prisma.project.create({
            data,
        });
    }

    revalidatePath('/admin/projects');
    revalidatePath('/');
}

export async function deleteProject(id: string) {
    await prisma.project.delete({
        where: { id },
    });

    revalidatePath('/admin/projects');
    revalidatePath('/');
}
