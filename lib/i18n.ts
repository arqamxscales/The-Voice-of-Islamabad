export const supportedLocales = ["en", "ur"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export const labels = {
  en: {
    home: "Home",
    news: "News",
    media: "Media",
    business: "Business",
    politics: "Politics",
    technology: "Technology",
    about: "About",
    contact: "Contact",
    latest: "Latest",
    readMore: "Read more",
    newsTicker: "News Ticker",
    adSpace: "Ad Space",
    weeklyUpdated: "Updated Weekly",
    allRights: "All Rights Reserved"
  },
  ur: {
    home: "ہوم",
    news: "خبریں",
    media: "میڈیا",
    business: "کاروبار",
    politics: "سیاست",
    technology: "ٹیکنالوجی",
    about: "تعارف",
    contact: "رابطہ",
    latest: "تازہ ترین",
    readMore: "مزید پڑھیں",
    newsTicker: "نیوز ٹکر",
    adSpace: "اشتہار",
    weeklyUpdated: "ہفتہ وار اپڈیٹ",
    allRights: "جملہ حقوق محفوظ ہیں"
  }
} as const;

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}
