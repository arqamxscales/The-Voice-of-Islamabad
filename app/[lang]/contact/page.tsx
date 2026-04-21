import { AdBookingWidget } from "@/components/AdBookingWidget";
import { getSiteConfig } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

export default async function ContactPage({
  params
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const config = getSiteConfig();

  return (
    <section className="contact-layout">
      <div className="simple-page">
        <h2>{lang === "en" ? "Contact" : "رابطہ"}</h2>
        <p>
          <strong>Email:</strong> {config.contact.email}
        </p>
        <p>
          <strong>Phone:</strong> {config.contact.phone}
        </p>
        <p>
          <strong>Address:</strong> {config.contact.address[lang]}
        </p>
      </div>
      <AdBookingWidget locale={lang} />
    </section>
  );
}
