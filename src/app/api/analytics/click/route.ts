import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { contentType, contentId, contentName } = await request.json();
    if (!contentType || !contentId || !contentName) {
      return NextResponse.json({ error: "contentType, contentId, contentName are required" }, { status: 400 });
    }
    await prisma.contentClick.create({
      data: { contentType, contentId, contentName },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to record content click:", error);
    return NextResponse.json({ error: "Failed to record click" }, { status: 500 });
  }
}
