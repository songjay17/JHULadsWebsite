import { prisma } from "@/lib/db";

export async function getStandings(leagueId: string) {
  const teams = await prisma.team.findMany({ where: { leagueId }, include: { scores: true } });
  // naive compute: wins/losses based on scores table pairs in a matchup
  const matchups = await prisma.matchup.findMany({
    where: { leagueId },
    include: { scores: true }
  });

  const byTeam = new Map<string, { teamId: string; name: string; wins: number; losses: number; ties: number; pf: number; pa: number }>();
  teams.forEach(t => byTeam.set(t.id, { teamId: t.id, name: t.name, wins: 0, losses: 0, ties: 0, pf: 0, pa: 0 }));

  for (const m of matchups) {
    if (m.scores.length < 2) continue;
    const [a, b] = m.scores;
    if (!a || !b) continue;
    const A = byTeam.get(a.teamId)!;
    const B = byTeam.get(b.teamId)!;
    A.pf += Number(a.points); A.pa += Number(b.points);
    B.pf += Number(b.points); B.pa += Number(a.points);
    if (a.points > b.points) { A.wins++; B.losses++; }
    else if (a.points < b.points) { B.wins++; A.losses++; }
    else { A.ties++; B.ties++; }
  }

  const rows = Array.from(byTeam.values()).sort((x, y) => {
    const wx = x.wins - x.losses, wy = y.wins - y.losses;
    if (wy !== wx) return wy - wx;
    if (y.pf !== x.pf) return y.pf - x.pf;
    return x.pa - y.pa;
  });
  return rows;
}
