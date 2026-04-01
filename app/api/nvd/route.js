/**
 * /api/nvd – Fetch AI/ML-related CVEs from NIST National Vulnerability Database
 *
 * NVD API v2 docs: https://services.nvd.nist.gov/rest/json/cves/2.0
 * Rate limit: 50 requests / 30 s (no API key required)
 */

const NVD_BASE = "https://services.nvd.nist.gov/rest/json/cves/2.0";
const RESULTS_PER_PAGE = 20;
const MAX_CVES = 15;
const CACHE_SECONDS = 3600; // 1 hour

export async function GET() {
  try {
    const params = new URLSearchParams({
      keywordSearch: "artificial intelligence machine learning",
      resultsPerPage: String(RESULTS_PER_PAGE),
      keywordExactMatch: "",
    });

    const res = await fetch(`${NVD_BASE}?${params}`, {
      headers: { "User-Agent": "ColibriiLabs-Observatory/1.0" },
      next: { revalidate: CACHE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`NVD API responded with ${res.status}`);
    }

    const data = await res.json();

    const cves = (data.vulnerabilities || []).slice(0, MAX_CVES).map((v) => {
      const cve = v.cve;
      const description =
        cve.descriptions?.find((d) => d.lang === "en")?.value || "";
      const metrics =
        cve.metrics?.cvssMetricV31?.[0] || cve.metrics?.cvssMetricV30?.[0];
      const score = metrics?.cvssData?.baseScore ?? null;
      const severity = metrics?.cvssData?.baseSeverity || "UNKNOWN";

      return {
        id: cve.id,
        description: description.slice(0, 300),
        published: cve.published,
        lastModified: cve.lastModified,
        severity,
        score,
        references: (cve.references || []).slice(0, 2).map((r) => r.url),
      };
    });

    return Response.json(
      { cves, total: data.totalResults, timestamp: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`,
        },
      }
    );
  } catch (error) {
    console.error("[/api/nvd] Error:", error.message);
    return Response.json(
      { cves: [], error: error.message, timestamp: new Date().toISOString() },
      { status: 502 }
    );
  }
}
