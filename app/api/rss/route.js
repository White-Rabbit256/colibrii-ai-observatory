import { PAI_NEWS } from "../../../components/data";

const BASE = "https://colibriilabs.ai";
const GDELT_URL = "https://api.gdeltproject.org/api/v2/doc/doc?query=%22artificial+intelligence%22+%22costa+rica%22&mode=artlist&maxrecords=5&format=json&sort=datedesc&timespan=7d";

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function item({ title, link, desc, date, source }) {
  return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${esc(link)}</link>
      <description><![CDATA[${desc}]]></description>
      <pubDate>${date}</pubDate>
      <source url="${esc(link)}">${esc(source)}</source>
    </item>`;
}

export async function GET() {
  const now = new Date().toUTCString();

  // Physical AI news (first 5)
  const paiItems = PAI_NEWS(true).slice(0, 5).map((n) =>
    item({
      title: n.headline,
      link: n.url,
      desc: n.significance,
      date: now,
      source: n.source,
    })
  );

  // Curated WEF insight items
  const wefItems = [
    item({
      title: "WEF Future of Jobs 2025: 41% of Employers Plan Workforce Reductions by 2030",
      link: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
      desc: "The World Economic Forum projects significant AI-driven labor disruption across BPO, digital services, and back-office operations — sectors critical to Costa Rica's free zone economy.",
      date: now,
      source: "World Economic Forum",
    }),
    item({
      title: "WEF: AI Governance Gap — Only 15 Countries Have Binding AI Legislation",
      link: "https://www.weforum.org/topics/artificial-intelligence-and-robotics/",
      desc: "Costa Rica's ENIA strategy scored 100/100 on vision but 0/100 on binding enforcement. The governance gap leaves SMEs and free zone companies without compliance clarity.",
      date: now,
      source: "World Economic Forum",
    }),
  ];

  // GDELT live news (best-effort)
  let gdeltItems = [];
  try {
    const res = await fetch(GDELT_URL, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const json = await res.json();
      const articles = json.articles || [];
      gdeltItems = articles.slice(0, 5).map((a) =>
        item({
          title: a.title || "AI + Costa Rica News",
          link: a.url || BASE,
          desc: a.seendate ? `GDELT article from ${a.seendate}` : "Live GDELT intelligence feed",
          date: a.seendate ? new Date(a.seendate.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, "$1-$2-$3T$4:$5:$6Z")).toUTCString() : now,
          source: a.domain || "GDELT",
        })
      );
    }
  } catch {
    // GDELT unavailable — continue without live feed
  }

  const allItems = [...paiItems, ...wefItems, ...gdeltItems].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Colibrii Labs — AI Observatory Costa Rica</title>
    <link>${BASE}</link>
    <description>AI policy intelligence, physical AI tracking, SME impact analysis, and governance monitoring for Costa Rica and Latin America.</description>
    <language>en</language>
    <copyright>CC BY-NC 4.0 Colibrii Labs 2024-2026</copyright>
    <managingEditor>andres@colibriilabs.com (Andrés Alpízar)</managingEditor>
    <lastBuildDate>${now}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="${BASE}/api/rss" rel="self" type="application/rss+xml" />
${allItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
