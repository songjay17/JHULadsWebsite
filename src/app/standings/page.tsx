import { getStandings } from "@/lib/standings";
import { prisma } from "@/lib/db";

export default async function StandingsPage() {
  const league = await prisma.league.findFirst();
  if (!league) return <div className="card">No league yet.</div>;
  const rows = await getStandings(league.id);
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Standings</h2>
      <table className="table">
        <thead>
          <tr><th>Team</th><th>W</th><th>L</th><th>T</th><th>PF</th><th>PA</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.teamId}>
              <td>{r.name}</td>
              <td>{r.wins}</td>
              <td>{r.losses}</td>
              <td>{r.ties}</td>
              <td>{r.pf.toFixed(2)}</td>
              <td>{r.pa.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
