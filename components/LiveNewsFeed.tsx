/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";
import type { Locale } from "@/lib/i18n";

interface FeedItem {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category?: string;
}

interface FeedResponse {
  items?: FeedItem[];
  timestamp?: string;
  lastUpdate?: string;
  error?: string;
}

export function LiveNewsFeed({ locale }: { locale: Locale }) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(300000); // 5 minutes default

  const loadNews = useCallback(async () => {
    try {
      const res = await fetch(`/api/newsdata?lang=${locale}&category=${locale === "ur" ? "پاکستان" : "Pakistan"}`);
      const json = (await res.json()) as FeedResponse;
      
      if (json.items && json.items.length > 0) {
        setItems(json.items);
        setLastUpdate(json.lastUpdate || new Date().toLocaleTimeString(locale));
      } else if (json.error) {
        console.warn("News API:", json.error);
      }
    } catch (error) {
      console.error("Failed to load news:", error);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  // Initial load
  useEffect(() => {
    void loadNews();
  }, [loadNews]);

  // Auto-refresh interval
  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      void loadNews();
    }, refreshInterval);

    return () => clearInterval(timer);
  }, [autoRefresh, refreshInterval, loadNews]);

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);

      if (diffMins < 1) return locale === "ur" ? "ابھی" : "Just now";
      if (diffMins < 60) return `${diffMins}${locale === "ur" ? " منٹ" : "m"} ago`;
      if (diffHours < 24) return `${diffHours}${locale === "ur" ? " گھنٹے" : "h"} ago`;
      
      return date.toLocaleDateString(locale);
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="live-news">
      <div className="section-head">
        <h2>{locale === "ur" ? "🔴 لائیو نیوز فیڈ" : "🔴 Live News Feed"}</h2>
        <div className="news-meta">
          <span className="update-status">
            {autoRefresh ? `✓ ${locale === "ur" ? "خود کار اپ ڈیٹ" : "Auto-updating"}` : locale === "ur" ? "متوقف" : "Paused"}
          </span>
          {lastUpdate && <span className="last-update">{locale === "ur" ? "آخری اپ ڈیٹ" : "Last updated"}: {lastUpdate}</span>}
        </div>
      </div>

      <div className="news-controls">
        <button 
          onClick={() => setAutoRefresh(!autoRefresh)}
          className="control-btn"
          title={autoRefresh ? "Pause auto-refresh" : "Resume auto-refresh"}
        >
          {autoRefresh ? "⏸" : "▶"} {locale === "ur" ? "اپ ڈیٹ" : "Auto-update"}
        </button>
        <button 
          onClick={() => void loadNews()}
          className="control-btn refresh-btn"
          title="Refresh now"
        >
          {locale === "ur" ? "🔄 ابھی اپ ڈیٹ کریں" : "🔄 Refresh Now"}
        </button>
      </div>

      {loading && items.length === 0 && (
        <div className="loading-skeleton">
          <p className="meta">{locale === "ur" ? "نیوز لوڈ ہو رہی ہے..." : "Loading news..."}</p>
        </div>
      )}

      <div className="live-news-grid">
        {items.map((item) => (
          <article className="live-news-card" key={item.id}>
            <div className="card-image-wrapper">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="live-news-image"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop";
                }}
              />
              {item.category && <span className="category-badge">{item.category}</span>}
            </div>
            <div className="live-news-body">
              <p className="meta">
                <span className="source">{item.source}</span>
                <span className="time-ago">{formatTime(item.publishedAt)}</span>
              </p>
              <h3>{item.title}</h3>
              <p className="description">{item.description}</p>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noreferrer noopener" 
                className="read-more"
              >
                {locale === "ur" ? "مکمل خبر پڑھیں →" : "Read Full Story →"}
              </a>
            </div>
          </article>
        ))}
      </div>

      {!loading && items.length === 0 && (
        <div className="no-news">
          <p>{locale === "ur" ? "کوئی نیوز دستیاب نہیں۔ براہِ مہربانی بعد میں دوبارہ کوشش کریں۔" : "No news available. Please try again later."}</p>
        </div>
      )}

      <style jsx>{`
        .live-news {
          padding: 2rem 1rem;
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .news-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          color: #666;
        }

        .update-status {
          color: #27ae60;
          font-weight: 600;
        }

        .news-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .control-btn {
          padding: 0.5rem 1rem;
          background: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .control-btn:hover {
          background: #e0e0e0;
          border-color: #999;
        }

        .refresh-btn {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }

        .refresh-btn:hover {
          background: #2980b9;
        }

        .card-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        .category-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .time-ago {
          margin-left: 1rem;
        }
      `}</style>
    </section>
  );
}
