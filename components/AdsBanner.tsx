import type { Locale } from "@/lib/i18n";
import { labels } from "@/lib/i18n";

interface AdsBannerProps {
  locale: Locale;
}

export function AdsBanner({ locale }: AdsBannerProps) {
  return (
    <aside className="ads-banner" aria-label={labels[locale].adSpace}>
      <h4>{labels[locale].adSpace}</h4>
      <p>728 x 90</p>
      <p>Premium business and media placement</p>
    </aside>
  );
}
