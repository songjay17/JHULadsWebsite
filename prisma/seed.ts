import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding...");
  const passwordHash = await bcrypt.hash("demo1234", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@league.local" },
    update: {},
    create: { email: "demo@league.local", name: "Demo User", role: "commish", passwordHash }
  });

  const league = await prisma.league.create({
    data: { name: "Demo League", season: 2025, provider: "manual" }
  });

  // Weeks 1-3
  const weeks = await prisma.$transaction([1,2,3].map(n => prisma.week.create({ data: { number: n, leagueId: league.id } })));

  // Teams
  const teams = await prisma.$transaction(
    ["Alpha", "Bravo", "Crimson", "Delta", "Echo", "Foxtrot", "Gamma", "Helix"].map(name =>
      prisma.team.create({ data: { name: name + " FC", leagueId: league.id } })
    )
  );

  // Matchups week 1 (4 games)
  const t = teams;
  const week1 = weeks[0];
  const pairings = [[t[0], t[1]], [t[2], t[3]], [t[4], t[5]], [t[6], t[7]]];
  for (const [home, away] of pairings) {
    const m = await prisma.matchup.create({
      data: { leagueId: league.id, weekId: week1.id, homeTeamId: home.id, awayTeamId: away.id }
    });
    await prisma.score.create({ data: { matchupId: m.id, teamId: home.id, points: Math.random() * 150 } });
    await prisma.score.create({ data: { matchupId: m.id, teamId: away.id, points: Math.random() * 150 } });
  }

  // One post, one thread
  await prisma.post.create({
    data: {
      leagueId: league.id,
      authorId: user.id,
      title: "Welcome to the League Companion",
      slug: "welcome",
      contentMd: "This is the first post. Update me from the admin later.",
      publishedAt: new Date()
    }
  });

  const thread = await prisma.thread.create({
    data: { leagueId: league.id, authorId: user.id, title: "Season Kickoff Thread" }
  });
  await prisma.comment.create({
    data: { threadId: thread.id, authorId: user.id, contentMd: "Let the trash talk begin." }
  });

  console.log("Seeded.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
