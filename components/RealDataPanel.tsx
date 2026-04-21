import type { Locale } from "@/lib/i18n";
import { getLiveSignals } from "@/lib/realData";

interface RealDataPanelProps {
  locale: Locale;
}

const copy = {
  en: {
    title: "Live Data Snapshot",
    subtitle: "Free public APIs (weather, FX, crypto)",
    weather: "Islamabad Weather",
    fx: "Exchange Rates",
    crypto: "Bitcoin (USD)",
    temp: "Temp",
    humidity: "Humidity",
    wind: "Wind",
    updated: "Updated"
  },
  ur: {
    title: "لائیو ڈیٹا اسنیپ شاٹ",
    subtitle: "مفت پبلک APIs (موسم، زرِمبادلہ، کرپٹو)",
    weather: "اسلام آباد موسم",
    fx: "زرِمبادلہ ریٹس",
    crypto: "بٹ کوائن (USD)",
    temp: "درجہ حرارت",
    humidity: "نمی",
    wind: "ہوا",
    updated: "اپ ڈیٹ"
  }
} as const;

export async function RealDataPanel({ locale }: RealDataPanelProps) {
  const data = await getLiveSignals();

  if (!data) {
    return null;
  }

  const t = copy[locale];

  return (
    <section className="live-panel" aria-label={t.title}>
      <div className="section-head">
        <h2>{t.title}</h2>
        <span>{t.subtitle}</span>
      </div>

      <div className="live-grid">
        <article className="live-card">
          <h3>{t.weather}</h3>
          <p>
            {t.temp}: <strong>{data.weather.tempC}°C</strong>
          </p>
          <p>
            {t.humidity}: <strong>{data.weather.humidity}%</strong>
          </p>
          <p>
            {t.wind}: <strong>{data.weather.windKmh} km/h</strong>
          </p>
        </article>

        <article className="live-card">
          <h3>{t.fx}</h3>
          <p>
            USD → PKR: <strong>{data.fx.usdToPkr}</strong>
          </p>
          <p>
            EUR → PKR: <strong>{data.fx.eurToPkr}</strong>
          </p>
          <p className="meta">
            {t.updated}: {new Date(data.updatedAt).toLocaleDateString(locale)}
          </p>
        </article>

        <article className="live-card">
          <h3>{t.crypto}</h3>
          <p>
            BTC → USD: <strong>{data.crypto.btcUsd.toLocaleString(locale)}</strong>
          </p>
          <p className="meta">CoinGecko</p>
        </article>
      </div>
    </section>
  );
}
