import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function ForumPage() {
  const threads = await prisma.thread.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Forum</h2>
      <ul className="list-disc ml-4">
        {threads.map(t => (
          <li key={t.id}>
            <Link href={`/forum/${t.id}`}>{t.title}</Link>
          </li>
        ))}
        {threads.length === 0 && <li className="text-sm text-zinc-500">No threads yet.</li>}
      </ul>
    </div>
  );
}
