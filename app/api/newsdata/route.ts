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
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669714112fc5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1585647346384-2593bc35786b?w=800&h=600&fit=crop"
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "ur" ? "ur" : "en";
  const category = searchParams.get("category") ?? "Pakistan";
  const apiKey = process.env.NEWSDATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { items: [], warning: "API key missing", timestamp: new Date().toISOString() },
      { headers: { "Cache-Control": "no-cache" } }
    );
  }

  try {
    // Query with category and language
    const endpoint = `https://newsdata.io/api/1/latest?apikey=${encodeURIComponent(
      apiKey
    )}&q=${encodeURIComponent(category)}&language=${lang}&country=pk&prioritydomain=top&size=12&image=1`;

    const res = await fetch(endpoint, { 
      next: { revalidate: parseInt(process.env.NEXT_PUBLIC_NEWS_CACHE_TIME || "300") } 
    });
    
    if (!res.ok) {
      return NextResponse.json(
        { items: [], timestamp: new Date().toISOString() },
        { status: 200, headers: { "Cache-Control": "public, s-maxage=60" } }
      );
    }

    const json = (await res.json()) as { results?: NewsDataArticle[] };
    const items = (json.results ?? []).slice(0, 12).map((item, index) => ({
      id: item.article_id ?? `${item.title ?? "item"}-${index}`,
      title: item.title ?? "Breaking News",
      description: item.description ?? "Stay tuned for updates",
      link: item.link ?? "#",
      imageUrl: item.image_url && isValidImageUrl(item.image_url) 
        ? item.image_url 
        : fallbackImages[index % fallbackImages.length],
      source: item.source_id ?? "newsdata",
      publishedAt: item.pubDate ?? new Date().toISOString(),
      category: category
    }));

    return NextResponse.json(
      { 
        items,
        timestamp: new Date().toISOString(),
        count: items.length,
        lastUpdate: new Date().toLocaleString()
      },
      { 
        headers: { 
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "Content-Type": "application/json"
        } 
      }
    );
  } catch (error) {
    console.error("News API Error:", error);
    return NextResponse.json(
      { 
        items: [],
        error: "Failed to fetch news",
        timestamp: new Date().toISOString()
      },
      { status: 200, headers: { "Cache-Control": "no-cache" } }
    );
  }
}

function isValidImageUrl(url: string): boolean {
  try {
    const validDomains = ["newsdata.io", "unsplash.com", "pexels.com", "pixabay.com", "imgur.com"];
    const urlObj = new URL(url);
    return validDomains.some(domain => urlObj.hostname.includes(domain)) && !url.includes("placeholder");
  } catch {
    return false;
  }
}
