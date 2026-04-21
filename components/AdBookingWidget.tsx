"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

export function AdBookingWidget({ locale }: { locale: Locale }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");

  const whatsappUrl = useMemo(() => {
    const message = `Ad Booking Request%0AName: ${encodeURIComponent(
      name || "N/A"
    )}%0ACompany: ${encodeURIComponent(company || "N/A")}%0ABudget: ${encodeURIComponent(
      budget || "N/A"
    )}%0ADetails: ${encodeURIComponent(details || "N/A")}`;
    return `https://wa.me/923554776466?text=${message}`;
  }, [name, company, budget, details]);

  return (
    <section className="simple-page">
      <h3>{locale === "ur" ? "اشتہار بکنگ" : "Ad Booking"}</h3>
      <p>
        {locale === "ur"
          ? "فارم مکمل کریں اور براہِ راست واٹس ایپ پر بکنگ بھیجیں۔"
          : "Fill details and send booking directly on WhatsApp."}
      </p>
      <div className="booking-grid">
        <input
          placeholder={locale === "ur" ? "نام" : "Name"}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder={locale === "ur" ? "کمپنی" : "Company"}
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <input
          placeholder={locale === "ur" ? "بجٹ" : "Budget"}
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
        />
        <textarea
          placeholder={locale === "ur" ? "تفصیلات" : "Campaign details"}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
        />
      </div>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="auth-btn inline-cta">
        {locale === "ur" ? "واٹس ایپ پر بکنگ بھیجیں" : "Send Booking on WhatsApp"}
      </a>
    </section>
  );
}
