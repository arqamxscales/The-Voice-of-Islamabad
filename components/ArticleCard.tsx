import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { labels } from "@/lib/i18n";
import type { Post } from "@/lib/types";

interface ArticleCardProps {
  post: Post;
  locale: Locale;
}

export function ArticleCard({ post, locale }: ArticleCardProps) {
  return (
    <article className="card">
      <Image
        src={post.coverImage}
        alt={post.title[locale]}
        width={800}
        height={500}
        className="card-image"
      />
      <div className="card-body">
        <p className="meta">
          {new Date(post.date).toLocaleDateString(locale)} • {post.author}
        </p>
        <h3>{post.title[locale]}</h3>
        <p>{post.excerpt[locale]}</p>
        <Link href={`/${locale}/article/${post.slug}`} className="read-more">
          {labels[locale].readMore}
        </Link>
      </div>
    </article>
  );
}
