import type { Locale } from "@/lib/i18n";
import { labels } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  siteName: string;
}

export function Footer({ locale, siteName }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} {siteName} — {labels[locale].allRights}
        </p>
      </div>
    </footer>
  );
}
