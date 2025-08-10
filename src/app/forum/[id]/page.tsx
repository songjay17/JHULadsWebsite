import { prisma } from "@/lib/db";

export default async function ThreadPage({ params }: { params: { id: string } }) {
  const thread = await prisma.thread.findUnique({ where: { id: params.id } });
  const comments = await prisma.comment.findMany({ where: { threadId: params.id }, orderBy: { createdAt: "asc" } });
  if (!thread) return <div className="card">Thread not found.</div>;
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-semibold">{thread.title}</h2>
      </div>
      <div className="card">
        <h3 className="font-medium mb-2">Comments</h3>
        <ul className="space-y-2">
          {comments.map(c => (
            <li key={c.id} className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <div className="text-sm">{c.contentMd}</div>
            </li>
          ))}
          {comments.length === 0 && <li className="text-sm text-zinc-500">No comments yet.</li>}
        </ul>
      </div>
    </div>
  );
}
