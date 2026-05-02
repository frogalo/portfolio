import React from "react";
import prisma from "@/lib/db";
import { testDbConnection } from "@/lib/db";
import ProjectAdminClient from "./ProjectAdminClient";

export default async function ProjectsAdminPage() {
  const dbOnline = await testDbConnection();
  let projects: any[] = [];
  let dbError: string | null = null;

  if (dbOnline) {
    try {
      projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
    } catch (err: any) {
      dbError = err?.message ?? "Failed to load entries.";
    }
  } else {
    dbError = "Database is offline — entries unavailable.";
  }

  return (
    <ProjectAdminClient 
      initialProjects={projects} 
      dbOnline={dbOnline} 
      dbError={dbError} 
    />
  );
}
