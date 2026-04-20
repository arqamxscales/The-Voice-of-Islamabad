import { ArticleCard } from "@/components/ArticleCard";
import { getPostsByCategory } from "@/lib/content";
import { labels, type Locale } from "@/lib/i18n";
import type { Category } from "@/lib/types";

interface CategoryPageProps {
  locale: Locale;
  category: Category;
}

export function CategoryPage({ locale, category }: CategoryPageProps) {
  const posts = getPostsByCategory(category);
  const heading = labels[locale][category];

  return (
    <section>
      <div className="section-head">
        <h2>{heading}</h2>
        <span>{posts.length} stories</span>
      </div>

      <div className="cards-grid">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}
