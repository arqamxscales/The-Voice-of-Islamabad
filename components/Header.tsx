import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { labels } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
  siteName: string;
  tagline: string;
}

export function Header({ locale, siteName, tagline }: HeaderProps) {
  const nav = labels[locale];

  return (
    <header className="site-header">
      <div className="container brand-row">
        <Link href={`/${locale}`} className="brand">
          <Image
            src="/assets/logo.png"
            alt={siteName}
            width={64}
            height={64}
            priority
          />
          <div>
            <h1>{siteName}</h1>
            <p>{tagline}</p>
          </div>
        </Link>
        <LanguageSwitcher locale={locale} />
      </div>

      <nav className="container nav-grid" aria-label="Primary">
        <Link href={`/${locale}`}>{nav.home}</Link>
        <Link href={`/${locale}/news`}>{nav.news}</Link>
        <Link href={`/${locale}/media`}>{nav.media}</Link>
        <Link href={`/${locale}/business`}>{nav.business}</Link>
        <Link href={`/${locale}/politics`}>{nav.politics}</Link>
        <Link href={`/${locale}/technology`}>{nav.technology}</Link>
        <Link href={`/${locale}/about`}>{nav.about}</Link>
        <Link href={`/${locale}/contact`}>{nav.contact}</Link>
      </nav>
    </header>
  );
}
