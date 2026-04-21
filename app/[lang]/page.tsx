import { ArticleCard } from "@/components/ArticleCard";
import { LiveNewsFeed } from "@/components/LiveNewsFeed";
import { RealDataPanel } from "@/components/RealDataPanel";
import { labels, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/content";

export default async function HomePage({
  params
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const posts = getAllPosts();

  return (
    <section>
      <RealDataPanel locale={lang} />
      <LiveNewsFeed locale={lang} />

      <div className="section-head">
        <h2>{labels[lang].latest}</h2>
        <span>{labels[lang].weeklyUpdated}</span>
      </div>
      <div className="cards-grid">
        {posts.slice(0, 9).map((post) => (
          <ArticleCard key={post.slug} post={post} locale={lang} />
        ))}
      </div>
    </section>
  );
}
