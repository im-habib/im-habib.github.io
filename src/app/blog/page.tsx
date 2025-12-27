import Card from "@/components/Card";
import Tag from "@/components/Tag";
import { getBlogPosts } from "@/lib/data";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Blog</h1>

      <div className="space-y-4">
        {posts.map((p) => (
          <a key={p.id} href={`/blog/${p.slug}`} className="block">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div className="text-lg font-semibold">{p.title}</div>
                <div className="text-sm text-neutral-500">{p.date}</div>
              </div>
              {p.summary ? (
                <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                  {p.summary}
                </p>
              ) : null}
              {p.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              ) : null}
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
