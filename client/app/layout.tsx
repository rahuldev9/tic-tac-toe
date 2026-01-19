import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { seoConfig, resolveSeoKey } from "@/lib/Seo-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Force dynamic rendering to read headers
export const dynamic = "force-dynamic";

// --------------------------------------------------------------
// ⭐ Dynamic Metadata - Read pathname from middleware header
// --------------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  const key = resolveSeoKey(pathname);
  const data = seoConfig[key];

  if (!data) {
    return {
      title: "Mirai Gen",
      description: "Custom Software & AI Systems for Education",
    };
  }

  return {
    metadataBase: new URL("https://tic-tac-toe-theta-six-56.vercel.app"),
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    alternates: {
      canonical: data.canonical,
    },
    authors: [{ name: "Mirai Gen" }],
    creator: "Mirai Gen",
    publisher: "Mirai Gen",
    openGraph: {
      ...data.openGraph,
      url: data.canonical,
    },
    twitter: {
      card: data.twitter.card,
      title: data.twitter.title,
      description: data.twitter.description,
      images: data.twitter.images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// --------------------------------------------------------------
// ⭐ Root Layout (with dynamic JSON-LD)
// --------------------------------------------------------------
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const key = resolveSeoKey(pathname);

  const pageSeo = seoConfig[key];
  const jsonLd = pageSeo?.schema || null;

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
          />
        )}
      </head>
      <meta
        name="google-site-verification"
        content="ipHbApTsNCMMhHn91DcftOdV-fdz6Bsx_qDN0GkoUdg"
      />
      <body className="antialiased">{children}</body>
    </html>
  );
}
