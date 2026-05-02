import React from "react";
import prisma from "@/lib/db";
import { testDbConnection } from "@/lib/db";
import ExperienceAdminClient from "./ExperienceAdminClient";

export default async function ExperienceAdminPage() {
  const dbOnline = await testDbConnection();
  let entries: any[] = [];
  let dbError: string | null = null;

  if (dbOnline) {
    try {
      entries = await prisma.experience.findMany({ orderBy: { createdAt: "desc" } });
    } catch (err: any) {
      dbError = err?.message ?? "Failed to load entries.";
    }
  } else {
    dbError = "Database is offline — entries unavailable.";
  }

  return (
    <ExperienceAdminClient 
      initialEntries={entries} 
      dbOnline={dbOnline} 
      dbError={dbError} 
    />
  );
}
