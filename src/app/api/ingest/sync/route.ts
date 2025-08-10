import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST() {
  // TODO: Replace with real provider fetch (e.g., Sleeper) and upserts.
  // For now, just returns count summaries so you can wire a "Sync now" button later.
  const leagues = await prisma.league.count();
  const teams = await prisma.team.count();
  const matchups = await prisma.matchup.count();
  const scores = await prisma.score.count();
  return NextResponse.json({ ok: true, summary: { leagues, teams, matchups, scores } });
}
