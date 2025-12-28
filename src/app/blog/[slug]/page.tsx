import Tag from "@/components/Tag";
import Card from "@/components/Card";
import LinkPill from "@/components/LinkPill";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return <div className="text-neutral-600">Post not found.</div>;

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <div className="mt-1 text-sm text-neutral-500">{post.date}</div>

        {post.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <LinkPill href={post.links?.github} label="GitHub" />
          <LinkPill href={post.links?.paper} label="Paper" />
          <LinkPill href={post.links?.demo} label="Demo" />
        </div>
      </Card>

      <Card>
        <div className="space-y-4">
          {post.content.map((b, idx) => {
            switch (b.type) {
              case "h2":
                return (
                  <h2 key={idx} className="text-xl font-semibold">
                    {b.text}
                  </h2>
                );
              case "h3":
                return (
                  <h3 key={idx} className="text-lg font-semibold">
                    {b.text}
                  </h3>
                );
              case "p":
                return (
                  <p
                    key={idx}
                    className="leading-7 text-neutral-800 dark:text-neutral-200"
                  >
                    {b.text}
                  </p>
                );
              case "ul":
                return (
                  <ul key={idx} className="list-disc space-y-1 pl-6">
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              case "ol":
                return (
                  <ol key={idx} className="list-decimal space-y-1 pl-6">
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ol>
                );
              case "quote":
                return (
                  <blockquote
                    key={idx}
                    className="border-l-2 pl-4 italic text-neutral-700 dark:text-neutral-300"
                  >
                    {b.text}
                    {b.cite ? (
                      <div className="mt-2 text-sm not-italic">— {b.cite}</div>
                    ) : null}
                  </blockquote>
                );
              case "code":
                return (
                  <pre
                    key={idx}
                    className="overflow-x-auto rounded-xl border p-4 text-sm"
                  >
                    <code>{b.code}</code>
                  </pre>
                );
              default:
                return null;
            }
          })}
        </div>
      </Card>
    </div>
  );
}
