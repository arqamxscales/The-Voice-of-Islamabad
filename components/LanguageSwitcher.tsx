"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const nextLocale: Locale = locale === "en" ? "ur" : "en";
  const label = nextLocale === "en" ? "EN" : "اردو";
  const pathWithoutLocale = pathname?.replace(/^\/(en|ur)/, "") || "";

  return (
    <Link
      href={`/${nextLocale}${pathWithoutLocale}`}
      className="lang-switch"
      aria-label="Switch language"
    >
      {label}
    </Link>
  );
}
