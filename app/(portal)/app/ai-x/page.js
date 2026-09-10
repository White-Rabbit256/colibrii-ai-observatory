import AIxExperience from "../../../../components/ai-x/AIxExperience";

export const metadata = {
  title: "AI-X Clock — Existential AI Risk Observatory",
  description:
    "An auditable, evidence-based index tracking proximity to plausible AI loss-of-control thresholds across seven capability and resilience gates.",
  openGraph: {
    title: "AI-X Clock — Existential AI Risk Observatory",
    description:
      "Seven gates. One auditable clock. Explore the evidence behind AI capability, agency, access, persistence, effectors, evasion and recovery denial.",
    type: "website",
  },
};

export default function AIxPage() {
  return <AIxExperience />;
}
