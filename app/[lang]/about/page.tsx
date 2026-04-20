import { getSiteConfig } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default async function AboutPage({
  params
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const config = getSiteConfig();

  return (
    <section className="simple-page">
      <h2>{lang === "en" ? "About" : "تعارف"}</h2>
      <p>{config.about[lang]}</p>
    </section>
  );
}
