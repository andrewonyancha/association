// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/Footer";
import Script from "next/script";
import { Header } from "./components/Header";
import MainAi from "./components/MainAi";
import ContextProvider from "./context/context";
import ForwarderContextProvider from "./context/context_forwarder";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tmxglobalfreight.com"),
  title: {
    default:
      "TMX Global Freight Network | Association of Independent Freight Forwarders",
    template: "%s | TMX Global Freight Network",
  },
  description:
    "Worldwide association of vetted independent freight forwarders. Join 200+ members in 120+ countries for global coverage, shared resources, and seamless cross-border logistics.",
  keywords:
    "freight forwarders association, global freight network, independent forwarders, TMX Global, logistics partnership, member directory, freight agent network",
  authors: [{ name: "TMX Global Freight Network" }],
  creator: "TMX Global Freight Network",
  publisher: "TMX Global Freight Network",
  formatDetection: { email: true, telephone: true },
  alternates: { canonical: "/" },
  openGraph: {
    title: "TMX Global Freight Network",
    description:
      "The leading association connecting independent freight forwarders worldwide.",
    url: "https://tmxglobalfreight.com",
    siteName: "TMX Global Freight Network",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TMX Global Freight Network – Global Association of Freight Forwarders",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMX Global Freight Network",
    description: "200+ independent freight forwarders. One global network.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add your Google Search Console code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/geist-mono.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/images/TMXLOGO.webp" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6A1B9A" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          Skip to main content
        </a>
      <ContextProvider>

    <ForwarderContextProvider>
        <Header />

        <main id="main-content">{children}</main>
        <MainAi />

        <Footer />
        </ForwarderContextProvider>
        </ContextProvider>

        {/* JSON-LD: Organization + Association */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TMX Global Freight Network",
              alternateName: "TMX Freight Association",
              url: "https://tmxglobalfreight.com",
              logo: "https://tmxglobalfreight.com/logo.png",
              description:
                "Global association of independent freight forwarding companies operating in over 120 countries.",
              foundingDate: "2015",
              foundingLocation: "Nairobi, Kenya",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi County",
                postalCode: "00100",
                addressCountry: "KE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+254-700-000-000",
                contactType: "Membership inquiries",
                email: "membership@tmxglobalfreight.com",
              },
              member: {
                "@type": "OrganizationRole",
                memberOf: {
                  "@type": "Program",
                  name: "TMX Global Freight Network Membership",
                },
                roleName: "Member Freight Forwarder",
                startDate: "Ongoing",
              },
              areaServed: "Worldwide",
              sameAs: [
                "https://www.linkedin.com/company/tmxglobalfreight",
                "https://twitter.com/tmxglobal",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}