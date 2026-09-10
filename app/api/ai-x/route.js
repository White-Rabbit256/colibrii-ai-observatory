import {
  aixSnapshot,
  gates,
  historicalSnapshots,
  methodology,
  scenarios,
  signals,
  sources,
} from "../../../data/aix";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  return Response.json(
    {
      schemaVersion: "1.0",
      generatedFrom: "versioned-public-evidence",
      snapshot: aixSnapshot,
      gates,
      scenarios,
      trajectory: historicalSnapshots,
      signals,
      methodology,
      evidence: sources,
      licenseNote:
        "AI-X scores are an experimental Colibrii Labs research framework. Source material remains subject to its original publishers' terms and licenses.",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Access-Control-Allow-Origin": "*",
        "X-AI-X-Version": aixSnapshot.version,
      },
    }
  );
}
