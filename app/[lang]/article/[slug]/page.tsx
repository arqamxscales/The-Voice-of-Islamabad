import Image from "next/image";
import { notFound } from "next/navigation";
import { AdsBanner } from "@/components/AdsBanner";
import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const locales: Locale[] = ["en", "ur"];

  return locales.flatMap((lang) =>
    posts.map((post) => ({
      lang,
      slug: post.slug
    }))
  );
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!isLocale(lang)) {
    return notFound();
  }
  const locale = lang as Locale;

  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }
  const article = post;

  const html = await renderMarkdown(article.content);

  return (
    <article className="article-layout">
      <section>
        <Image
          src={article.coverImage}
          alt={article.title[locale]}
          width={1200}
          height={700}
          className="article-cover"
        />
        <h2>{article.title[locale]}</h2>
        <p className="meta">
          {new Date(article.date).toLocaleDateString(locale)} • {article.author} • {article.category}
        </p>
        <div className="article-content" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
      <div>
        <AdsBanner locale={locale} />
      </div>
    </article>
  );
}
