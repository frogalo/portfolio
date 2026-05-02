import React from "react";
import prisma from "@/lib/db";
import { testDbConnection } from "@/lib/db";
import EducationAdminClient from "./EducationAdminClient";

export default async function EducationAdminPage() {
  const dbOnline = await testDbConnection();
  let entries: any[] = [];
  let dbError: string | null = null;

  if (dbOnline) {
    try {
      entries = await prisma.education.findMany({ orderBy: { createdAt: "desc" } });
    } catch (err: any) {
      dbError = err?.message ?? "Failed to load entries.";
    }
  } else {
    dbError = "Database is offline — entries unavailable.";
  }

  return (
    <EducationAdminClient 
      initialEntries={entries} 
      dbOnline={dbOnline} 
      dbError={dbError} 
    />
  );
}
