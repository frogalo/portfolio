import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { path } = await request.json();
    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }
    await prisma.pageView.create({
      data: { path },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to record page view:", error);
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 });
  }
}
