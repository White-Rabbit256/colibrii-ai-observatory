/**
 * /api/who – Fetch Costa Rica health indicators from the WHO Global Health Observatory
 *
 * GHO API docs: https://ghoapi.azureedge.net/api/
 * No authentication required.
 */

const GHO_BASE = "https://ghoapi.azureedge.net/api";
const COUNTRY_CODE = "CRI"; // Costa Rica
const CACHE_SECONDS = 86400; // 24 hours

const INDICATORS = [
  { code: "UHC_INDEX_REPORTED", name: "UHC Coverage Index" },
  { code: "WHOSIS_000001", name: "Life Expectancy" },
  { code: "WHS2_131", name: "Physicians per 10,000" },
  { code: "NCD_BMI_30A", name: "Obesity Prevalence" },
  { code: "MDG_0000000001", name: "Under-5 Mortality Rate" },
];

async function fetchIndicator(indicator) {
  const url = `${GHO_BASE}/${indicator.code}?$filter=SpatialDim eq '${COUNTRY_CODE}'&$orderby=TimeDim desc&$top=5`;

  const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } });

  if (!res.ok) {
    console.warn(
      `[/api/who] Failed to fetch ${indicator.code}: ${res.status}`
    );
    return { ...indicator, data: [] };
  }

  const json = await res.json();

  return {
    ...indicator,
    data: (json.value || []).map((v) => ({
      year: v.TimeDim,
      value: v.NumericValue,
      sex: v.Dim1 || null,
    })),
  };
}

export async function GET() {
  try {
    const results = await Promise.allSettled(INDICATORS.map(fetchIndicator));

    const indicators = results.map((r, i) =>
      r.status === "fulfilled" ? r.value : { ...INDICATORS[i], data: [] }
    );

    return Response.json(
      { indicators, timestamp: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`,
        },
      }
    );
  } catch (error) {
    console.error("[/api/who] Error:", error.message);
    return Response.json(
      {
        indicators: [],
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 502 }
    );
  }
}
