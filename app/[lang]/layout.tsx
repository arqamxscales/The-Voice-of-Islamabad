import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsTicker } from "@/components/NewsTicker";
import { getSiteConfig } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) {
    return {};
  }

  const config = getSiteConfig();

  return {
    title: `${config.name} | ${lang === "en" ? "News" : "خبریں"}`,
    description: config.tagline
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return notFound();
  }

  const locale = lang as Locale;

  const config = getSiteConfig();

  return (
    <>
      <Header locale={locale} siteName={config.name} tagline={config.tagline} />
      <NewsTicker locale={locale} items={config.ticker[locale]} />
      <main className="container">{children}</main>
      <Footer locale={locale} siteName={config.name} />
    </>
  );
}
