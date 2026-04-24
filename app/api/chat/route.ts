import { NextResponse } from "next/server";

interface ChatBody {
  message?: string;
  locale?: "en" | "ur";
  context?: "news" | "booking" | "support";
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923554776466";

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
        ? "السلام علیکم، میں وائس آف اسلام آباد پر اشتہار بک کروانا چاہتا/چاہتی ہوں۔ براہِ کرم ریٹ کارڈ اور دستیاب سلاٹس شیئر کریں۔"
        : "Hello, I want to book an ad on The Voice of Islamabad. Please share rates and available slots.";

    return {
      answer:
        locale === "ur"
          ? "اشتہار بکنگ کے لیے یہ بٹن دبائیں۔ ہماری ٹیم واٹس ایپ پر 24/7 دستیاب ہے۔"
          : "Use the button below for ad booking. Our team is available 24/7 on WhatsApp.",
      whatsappUrl: buildBookingLink(text)
    };
  }

  if (lower.includes("demo") || lower.includes("login") || lower.includes("account")) {
    return {
      answer:
        locale === "ur"
          ? "ڈیمو لاگ اِن: email demo@voi.news اور password demo123 استعمال کریں۔ یا واٹس ایپ سے رابطہ کریں۔"
          : "Demo login: use email demo@voi.news and password demo123. Or contact us on WhatsApp."
    };
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("phone")) {
    return {
      answer:
        locale === "ur"
          ? "رابطہ کریں: email: info@voiceofislamabad.pk | WhatsApp: +923554776466 | ویب سائٹ: voiceofislamabad.pk"
          : "Contact: email: info@voiceofislamabad.pk | WhatsApp: +923554776466 | Website: voiceofislamabad.pk"
    };
  }

  return {
    answer:
      locale === "ur"
        ? "میں آپ کی مدد کے لیے حاضر ہوں۔ آپ نیوز، اشتہار، رابطہ یا اور کچھ بھی پوچھ سکتے ہیں۔"
        : "I'm here to help. Ask about news, ad booking, contact info, or anything else."
  };
}

async function advancedAiReply(message: string, locale: "en" | "ur"): Promise<string | null> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  if (!openaiKey && !openrouterKey) {
    return null;
  }

  try {
    let response;

    // Try OpenAI first, then OpenRouter as fallback
    if (openaiKey) {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are The Voice of Islamabad intelligent news assistant. Language: ${
                locale === "ur" ? "Urdu" : "English"
              }. Be concise (max 2 sentences). 
              Context: Pakistan's premier news platform covering politics, business, technology, media, and culture.
              If user asks about ad booking, mention WhatsApp +923554776466.
              Be informative, professional, and helpful.`
            },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });
    } else {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openrouterKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [
            {
              role: "system",
              content: `You are The Voice of Islamabad AI assistant. Respond in ${
                locale === "ur" ? "Urdu" : "English"
              }. Keep responses concise (max 2 sentences).`
            },
            { role: "user", content: message }
          ],
          temperature: 0.6,
          max_tokens: 150
        })
      });
    }

    if (!response.ok) {
      console.error("AI API error:", response.status);
      return null;
    }

    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    return json.choices?.[0]?.message?.content?.trim() ?? null;
  } catch (error) {
    console.error("AI Reply Error:", error);
    return null;
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as ChatBody;
  const message = body.message?.trim() ?? "";
  const locale = body.locale === "ur" ? "ur" : "en";

  if (!message) {
    return NextResponse.json(
      { answer: locale === "ur" ? "پیغام درکار ہے" : "Message is required" },
      { status: 400 }
    );
  }

  // Try intelligent AI response first
  const aiResponse = await advancedAiReply(message, locale);
  if (aiResponse) {
    return NextResponse.json(
      { 
        answer: aiResponse,
        isAI: true,
        timestamp: new Date().toISOString()
      },
      { headers: { "Cache-Control": "no-cache" } }
    );
  }

  // Fallback to rule-based response
  const rules = ruleBasedReply(message, locale);
  return NextResponse.json(
    {
      ...rules,
      isAI: false,
      timestamp: new Date().toISOString()
    },
    { headers: { "Cache-Control": "no-cache" } }
  );
}
