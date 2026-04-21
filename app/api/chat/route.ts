import { NextResponse } from "next/server";

interface ChatBody {
  message?: string;
  locale?: "en" | "ur";
}

const whatsappNumber = "923554776466";

function buildBookingLink(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function ruleBasedReply(message: string, locale: "en" | "ur") {
  const lower = message.toLowerCase();

  if (
    lower.includes("ad") ||
    lower.includes("ads") ||
    lower.includes("advert") ||
    lower.includes("sponsor") ||
    lower.includes("booking")
  ) {
    const text =
      locale === "ur"
        ? "اسلام علیکم، میں وائس آف اسلام آباد پر اشتہار بک کروانا چاہتا/چاہتی ہوں۔ براہِ کرم ریٹ کارڈ اور دستیاب سلاٹس شیئر کریں۔"
        : "Hello, I want to book an ad on The Voice of Islamabad. Please share rates and available slots.";

    return {
      answer:
        locale === "ur"
          ? "اشتہار بکنگ کے لیے یہ بٹن دبائیں۔ ہماری ٹیم واٹس ایپ پر فوری جواب دے گی۔"
          : "Use the button below for ad booking. Our team will respond on WhatsApp.",
      whatsappUrl: buildBookingLink(text)
    };
  }

  if (lower.includes("demo") || lower.includes("login") || lower.includes("account")) {
    return {
      answer:
        locale === "ur"
          ? "ڈیمو لاگ اِن: email demo@voi.news اور password demo123 استعمال کریں۔"
          : "Demo login: use email demo@voi.news and password demo123."
    };
  }

  if (lower.includes("weather") || lower.includes("rate") || lower.includes("news")) {
    return {
      answer:
        locale === "ur"
          ? "ہوم پیج پر لائیو نیوز، موسم، اور ایکسچینج ریٹس ہر چند منٹ میں اپ ڈیٹ ہوتے ہیں۔"
          : "The homepage has live news, weather, and exchange rates updated every few minutes."
    };
  }

  return {
    answer:
      locale === "ur"
        ? "میں آپ کی مدد کے لیے حاضر ہوں۔ آپ نیوز، ایڈ بکنگ، رابطہ یا ڈیمو لاگ اِن کے بارے میں پوچھ سکتے ہیں۔"
        : "I can help with news, ad booking, contact details, and demo login. Ask anything."
  };
}

async function aiReply(message: string): Promise<string | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are The Voice of Islamabad assistant. Be concise. If user asks ad booking, direct them to WhatsApp +923554776466."
          },
          { role: "user", content: message }
        ],
        temperature: 0.4
      })
    });

    if (!res.ok) {
      return null;
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    return json.choices?.[0]?.message?.content?.trim() ?? null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatBody;
  const message = body.message?.trim() ?? "";
  const locale = body.locale === "ur" ? "ur" : "en";

  if (!message) {
    return NextResponse.json({ answer: "Message is required" }, { status: 400 });
  }

  const rules = ruleBasedReply(message, locale);

  if (rules.whatsappUrl) {
    return NextResponse.json(rules);
  }

  const ai = await aiReply(message);
  if (ai) {
    return NextResponse.json({ answer: ai });
  }

  return NextResponse.json(rules);
}
