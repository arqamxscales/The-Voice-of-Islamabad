export interface LiveSignals {
  updatedAt: string;
  weather: {
    tempC: number;
    humidity: number;
    windKmh: number;
  };
  fx: {
    usdToPkr: number;
    eurToPkr: number;
  };
  crypto: {
    btcUsd: number;
  };
}

function round(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export async function getLiveSignals(): Promise<LiveSignals | null> {
  try {
    const [weatherRes, usdPkrRes, eurPkrRes, btcRes] = await Promise.all([
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=33.6844&longitude=73.0479&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=Asia%2FKarachi",
        { next: { revalidate: 1800 } }
      ),
      fetch("https://api.frankfurter.app/latest?from=USD&to=PKR", {
        next: { revalidate: 1800 }
      }),
      fetch("https://api.frankfurter.app/latest?from=EUR&to=PKR", {
        next: { revalidate: 1800 }
      }),
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
        { next: { revalidate: 1800 } }
      )
    ]);

    if (!weatherRes.ok || !usdPkrRes.ok || !eurPkrRes.ok || !btcRes.ok) {
      return null;
    }

    const weatherJson = (await weatherRes.json()) as {
      current?: {
        temperature_2m?: number;
        relative_humidity_2m?: number;
        wind_speed_10m?: number;
      };
      current_units?: {
        time?: string;
      };
    };

    const usdPkrJson = (await usdPkrRes.json()) as {
      date?: string;
      rates?: {
        PKR?: number;
      };
    };

    const eurPkrJson = (await eurPkrRes.json()) as {
      rates?: {
        PKR?: number;
      };
    };

    const btcJson = (await btcRes.json()) as {
      bitcoin?: {
        usd?: number;
      };
    };

    const tempC = weatherJson.current?.temperature_2m;
    const humidity = weatherJson.current?.relative_humidity_2m;
    const windKmh = weatherJson.current?.wind_speed_10m;
    const usdToPkr = usdPkrJson.rates?.PKR;
    const eurToPkr = eurPkrJson.rates?.PKR;
    const btcUsd = btcJson.bitcoin?.usd;

    if (
      tempC === undefined ||
      humidity === undefined ||
      windKmh === undefined ||
      usdToPkr === undefined ||
      eurToPkr === undefined ||
      btcUsd === undefined
    ) {
      return null;
    }

    return {
      updatedAt: usdPkrJson.date ?? new Date().toISOString(),
      weather: {
        tempC: round(tempC, 1),
        humidity: round(humidity, 0),
        windKmh: round(windKmh, 1)
      },
      fx: {
        usdToPkr: round(usdToPkr, 2),
        eurToPkr: round(eurToPkr, 2)
      },
      crypto: {
        btcUsd: round(btcUsd, 0)
      }
    };
  } catch {
    return null;
  }
}
