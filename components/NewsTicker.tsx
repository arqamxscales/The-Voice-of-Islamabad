import type { Locale } from "@/lib/i18n";
import { labels } from "@/lib/i18n";

interface NewsTickerProps {
  items: string[];
  locale: Locale;
}

export function NewsTicker({ items, locale }: NewsTickerProps) {
  return (
    <section className="ticker" aria-label={labels[locale].newsTicker}>
      <div className="ticker-label">{labels[locale].newsTicker}</div>
      <div className="ticker-track-wrap">
        <div className="ticker-track">
          {[...items, ...items].map((item, index) => (
            <span className="ticker-item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
