import { CategoryPage } from "@/app/[lang]/_components/CategoryPage";
import type { Locale } from "@/lib/i18n";

export default async function PoliticsPage({
  params
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return <CategoryPage locale={lang} category="politics" />;
}
