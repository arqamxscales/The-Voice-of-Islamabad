import { NextResponse } from "next/server";

interface NewsDataArticle {
  article_id?: string;
  title?: string;
  description?: string;
  link?: string;
  image_url?: string;
  source_id?: string;
  pubDate?: string;
}

const fallbackImages = [
  "/uploads/headline-wrap.jpg",
  "/uploads/market-brief.jpg",
  "/uploads/media-watch.jpg",
  "/uploads/policy-desk.jpg",
  "/uploads/tech-policy.jpg"
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "ur" ? "ur" : "en";
  const query = searchParams.get("q") ?? "Pakistan OR Islamabad";
  const apiKey = process.env.NEWSDATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      items: [],
      warning: "NEWSDATA_API_KEY is missing"
    });
  }

  const endpoint = `https://newsdata.io/api/1/latest?apikey=${encodeURIComponent(
    apiKey
  )}&q=${encodeURIComponent(query)}&language=${lang}&country=pk&prioritydomain=top&size=8`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 180 } });
    if (!res.ok) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const json = (await res.json()) as {
      results?: NewsDataArticle[];
    };

    const items = (json.results ?? []).slice(0, 8).map((item, index) => ({
      id: item.article_id ?? `${item.title ?? "item"}-${index}`,
      title: item.title ?? "Untitled",
      description: item.description ?? "",
      link: item.link ?? "#",
      imageUrl: item.image_url ?? fallbackImages[index % fallbackImages.length],
      source: item.source_id ?? "newsdata",
      publishedAt: item.pubDate ?? new Date().toISOString()
    }));

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
