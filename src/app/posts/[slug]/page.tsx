import { prisma } from "@/lib/db";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return <div className="card">Post not found.</div>;
  return (
    <article className="card prose prose-zinc dark:prose-invert max-w-none">
      <h1>{post.title}</h1>
      <pre className="whitespace-pre-wrap">{post.contentMd}</pre>
    </article>
  );
}
