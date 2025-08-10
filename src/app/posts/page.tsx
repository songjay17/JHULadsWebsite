import { prisma } from "@/lib/db";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Posts</h2>
      <ul className="list-disc ml-4">
        {posts.map(p => (
          <li key={p.id}>
            <Link href={`/posts/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
        {posts.length === 0 && <li className="text-sm text-zinc-500">No posts yet.</li>}
      </ul>
    </div>
  );
}
