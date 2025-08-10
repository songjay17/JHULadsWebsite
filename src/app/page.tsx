import { prisma } from "@/lib/db";

async function getHighlights() {
  const latestWeek = await prisma.week.findFirst({ orderBy: { number: "desc" } });
  const top = await prisma.score.findMany({
    where: latestWeek ? { matchup: { weekId: latestWeek.id } } : {},
    include: { team: true, matchup: true },
    orderBy: { points: "desc" },
    take: 5
  });
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" }, take: 5 });
  const threads = await prisma.thread.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
  return { latestWeek, top, posts, threads };
}

export default async function HomePage() {
  const { latestWeek, top, posts, threads } = await getHighlights();
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Top Scorers {latestWeek ? `(Week ${latestWeek.number})` : ""}</h2>
        <ul className="space-y-1">
          {top.length === 0 && <li className="text-sm text-zinc-500">No data yet.</li>}
          {top.map((s) => (
            <li key={s.id} className="flex justify-between">
              <span>{s.team.name}</span>
              <span className="font-mono">{Number(s.points).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Latest Posts</h2>
        <ul className="list-disc ml-4">
          {posts.map(p => <li key={p.id}>{p.title}</li>)}
          {posts.length === 0 && <li className="text-sm text-zinc-500">No posts yet.</li>}
        </ul>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Active Threads</h2>
        <ul className="list-disc ml-4">
          {threads.map(t => <li key={t.id}>{t.title}</li>)}
          {threads.length === 0 && <li className="text-sm text-zinc-500">No threads yet.</li>}
        </ul>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Awards (Latest Week)</h2>
        <p className="text-sm text-zinc-500">Populate via the awards engine after ingest.</p>
      </div>
    </div>
  );
}
