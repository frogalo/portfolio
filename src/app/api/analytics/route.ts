import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

function formatMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // "YYYY-MM"
}

function fillDateRange(start: Date, end: Date, data: Record<string, number>): { date: string; views: number }[] {
  const result = [];
  const current = new Date(start);
  while (current <= end) {
    const key = formatDate(current);
    result.push({ date: key, views: data[key] ?? 0 });
    current.setDate(current.getDate() + 1);
  }
  return result;
}

function fillMonthRange(start: Date, end: Date, data: Record<string, number>): { date: string; views: number }[] {
  const result = [];
  const current = new Date(start.getFullYear(), start.getMonth(), 1);
  while (current <= end) {
    const key = formatMonth(current);
    result.push({ date: key, views: data[key] ?? 0 });
    current.setMonth(current.getMonth() + 1);
  }
  return result;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 29);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  // --- Daily page views (last 30 days) ---
  const dailyRaw = await prisma.pageView.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true, path: true },
  });

  const dailyMap: Record<string, number> = {};
  for (const pv of dailyRaw) {
    const key = formatDate(pv.createdAt);
    dailyMap[key] = (dailyMap[key] ?? 0) + 1;
  }
  const dailyViews = fillDateRange(thirtyDaysAgo, now, dailyMap);

  // --- Monthly page views (last 12 months) ---
  const monthlyRaw = await prisma.pageView.findMany({
    where: { createdAt: { gte: twelveMonthsAgo } },
    select: { createdAt: true },
  });

  const monthlyMap: Record<string, number> = {};
  for (const pv of monthlyRaw) {
    const key = formatMonth(pv.createdAt);
    monthlyMap[key] = (monthlyMap[key] ?? 0) + 1;
  }
  const monthlyViews = fillMonthRange(twelveMonthsAgo, now, monthlyMap);

  // --- Content clicks (top items) ---
  const clicksRaw = await prisma.contentClick.findMany({
    select: { contentType: true, contentId: true, contentName: true },
  });

  const clickMap: Record<string, { contentType: string; contentId: string; contentName: string; clicks: number }> = {};
  for (const c of clicksRaw) {
    const key = c.contentId;
    if (!clickMap[key]) {
      clickMap[key] = { ...c, clicks: 0 };
    }
    clickMap[key].clicks++;
  }
  const topContent = Object.values(clickMap).sort((a, b) => b.clicks - a.clicks).slice(0, 20);

  // --- Summary totals ---
  const totalViews = await prisma.pageView.count();
  const totalClicks = await prisma.contentClick.count();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayViews = await prisma.pageView.count({ where: { createdAt: { gte: todayStart } } });

  return NextResponse.json({
    totalViews,
    todayViews,
    totalClicks,
    dailyViews,
    monthlyViews,
    topContent,
  });
}
