/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

interface FeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
}

export function LiveNewsFeed({ locale }: { locale: Locale }) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const res = await fetch(`/api/newsdata?lang=${locale}`);
        const json = (await res.json()) as { items?: FeedItem[] };
        if (!ignore) {
          setItems(json.items ?? []);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void load();
    const timer = setInterval(() => {
      void load();
    }, 120000);

    return () => {
      ignore = true;
      clearInterval(timer);
    };
  }, [locale]);

  return (
    <section className="live-news">
      <div className="section-head">
        <h2>{locale === "ur" ? "لائیو نیوز فیڈ" : "Live News Feed"}</h2>
        <span>
          {locale === "ur" ? "NewsData.io سے حقیقی وقت اپ ڈیٹس" : "Realtime updates from NewsData.io"}
        </span>
      </div>

      {loading ? <p className="meta">Loading...</p> : null}

      <div className="live-news-grid">
        {items.map((item) => (
          <article className="live-news-card" key={item.id}>
            <img src={item.imageUrl} alt={item.title} className="live-news-image" loading="lazy" />
            <div className="live-news-body">
              <p className="meta">
                {item.source} • {new Date(item.publishedAt).toLocaleString(locale)}
              </p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noreferrer" className="read-more">
                {locale === "ur" ? "اصل خبر" : "Read Source"}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
