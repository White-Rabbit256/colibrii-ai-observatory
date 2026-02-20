import "./globals.css";
import { Inter } from "next/font/google";
import { Fraunces } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["700", "800", "900"],
  display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://colibriilabs.com"),
  title: {
    default: "Colibrii Labs — AI Observatory Costa Rica | Agile Intelligence",
    template: "%s | Colibrii Labs"
  },
  description: "Real-time strategic AI intelligence for Costa Rica. 20-country composite index (CAPI-CR), 25+ international data sources, 10 proprietary algorithms, 55-term glossary, WEF 2026 risk data with EOS per-country analysis, policy simulator. By Andrés Alpízar / Colibrii Labs.",
  keywords: [
    "AI Observatory", "Costa Rica", "artificial intelligence", "AI readiness", "CAPI-CR",
    "nearshoring", "free zones", "Colibrii Labs", "physical AI", "humanoid robots",
    "AI policy", "AI regulation", "EU AI Act", "South Korea AI Framework",
    "ENIA Costa Rica", "AI governance", "WEF Global Risks 2026", "deepfakes",
    "cybersecurity", "Conti attack", "OWASP LLM", "prompt injection",
    "Shadow AI", "digital twins", "RAG", "AI agents", "agentic AI",
    "PROCOMER", "CINDE", "zonas francas", "BPO automation",
    "AI education", "INA", "UNESCO RAM", "observatorio AI",
    "WEF 2026", "geoeconomic confrontation", "AI adverse outcomes",
    "misinformation", "transformer", "multimodal AI", "edge AI",
    "AI alignment", "federated learning", "responsible AI",
    "post-quantum cryptography", "K-shaped economy", "polycrisis",
    "quantum computing risks", "QVRI", "SIRI", "GERI",
    "WEF Executive Opinion Survey", "INCAE Business School", "EOS risks",
    "AI blind spot", "country risk profiles",
    "Andrés Alpízar", "Agile Intelligence"
  ],
  authors: [{ name: "Andrés Alpízar", url: "https://colibriilabs.com" }],
  creator: "Colibrii Labs",
  publisher: "Colibrii Labs",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_CR",
    alternateLocale: "en_US",
    url: "https://colibriilabs.com",
    title: "Colibrii Labs — AI Observatory Costa Rica | Agile Intelligence",
    description: "Real-time strategic AI intelligence. 20-country composite index, 25+ data sources, WEF 2026 risk data with EOS per-country analysis, 10 proprietary algorithms. Policy simulator, country profiles, 55-term glossary.",
    siteName: "Colibrii Labs",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Colibrii Labs — AI Observatory Costa Rica" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Colibrii Labs — AI Observatory Costa Rica | Agile Intelligence",
    description: "Real-time strategic AI intelligence for Costa Rica's positioning in the global AI transformation. By Andrés Alpízar.",
    images: ["/og-image.svg"]
  },
  alternates: {
    canonical: "https://colibriilabs.com",
    languages: { "es": "https://colibriilabs.com", "en": "https://colibriilabs.com" }
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafbfc",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Colibrii Labs — AI Observatory Costa Rica",
        description: "Real-time strategic AI intelligence platform for Costa Rica. 20-country CAPI-CR index, 10 proprietary algorithms, policy simulator.",
        url: "https://colibriilabs.com",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        author: { "@type": "Organization", "@id": "https://colibriilabs.com/#org" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
      },
      {
        "@type": "ResearchOrganization",
        "@id": "https://colibriilabs.com/#org",
        name: "Colibrii Labs",
        url: "https://colibriilabs.com",
        email: "andres@colibriilabs.com",
        description: "Strategic AI intelligence research for Costa Rica and Latin America. Agile Intelligence.",
        founder: { "@type": "Person", name: "Andrés Alpízar" },
        areaServed: { "@type": "Country", name: "Costa Rica" },
        knowsAbout: ["Artificial Intelligence", "AI Policy", "Nearshoring", "Free Zones", "Digital Security"]
      },
      {
        "@type": "Dataset",
        name: "CAPI-CR — Colibrii AI Preparedness Index",
        description: "Composite index measuring AI readiness across 6 dimensions for 20 countries. Extends IMF AIPI methodology.",
        url: "https://colibriilabs.com/app",
        creator: { "@type": "Organization", "@id": "https://colibriilabs.com/#org" },
        license: "https://creativecommons.org/licenses/by-nc/4.0/",
        temporalCoverage: "2018/2026",
        spatialCoverage: "Global (20 countries)",
        variableMeasured: [
          "Digital Infrastructure", "Human Capital", "Innovation",
          "AI Regulation", "Sustainable Energy", "Digital Security"
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is CAPI-CR?",
            acceptedAnswer: { "@type": "Answer", text: "The Colibrii AI Preparedness Index (CAPI-CR) is a proprietary 6-dimension composite index extending the IMF AIPI methodology. It evaluates 20 peer countries across Digital Infrastructure, Human Capital, Innovation, AI Regulation, Sustainable Energy, and Digital Security using 11 real-time World Bank indicators plus 2 curated dimensions." }
          },
          {
            "@type": "Question",
            name: "How many data sources does Colibrii Labs use?",
            acceptedAnswer: { "@type": "Answer", text: "The observatory integrates 20+ international data sources including 4 live APIs (World Bank, GDELT, Exchange Rates, REST Countries), 29+ annual reports (WEF, Stanford HAI, Oxford Insights, IMF), and 13 API endpoints planned or available for future integration." }
          },
          {
            "@type": "Question",
            name: "What is Costa Rica's AI readiness status?",
            acceptedAnswer: { "@type": "Answer", text: "Costa Rica is classified as an 'AI Overperformer' by the World Bank, scoring 100/100 on AI Vision by Oxford Insights. However, it lacks binding AI legislation (score 0.38/1.0). The observatory tracks CR's positioning against 19 peer countries to identify strengths, gaps, and policy opportunities." }
          },
          {
            "@type": "Question",
            name: "What does the WEF Executive Opinion Survey (EOS) reveal about Costa Rica?",
            acceptedAnswer: { "@type": "Answer", text: "The WEF EOS surveys 11,000+ business leaders across 116 economies. Costa Rica's EOS (conducted via INCAE Business School) identifies crime, insufficient public services, societal polarization, unemployment, and debt as the top 5 risks — with zero AI/technology risks in the list. This perception gap is significant: global experts rank AI adverse outcomes as #5 long-term, and Vietnam's business leaders rank it #1." }
          }
        ]
      }
    ]
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
