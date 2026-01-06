import "@/app/globals.css";

import Script from "next/script";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";

import Shell from "@/components/Shell";
// import TurnstileGate from "@/components/TurnstileGate";
import ThemeProvider from "@/components/ThemeProvider";
import { ContentProvider } from "@/context/ContentProvider";
import { getNav, getProfile, getEntries } from "@/lib/data";

// 1. Optimize Fonts (Prevents Layout Shift)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 2. Separate Viewport Configuration (Next.js 15 standard)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// 3. Centralized Metadata API
export const metadata: Metadata = {
  title: {
    default: "As Md Habibullah | Academic Portfolio",
    template: "%s | As Md Habibullah",
  },
  description:
    "PhD researcher in Computer Science and Technology focused on Deep Reinforcement Learning (DRL) for financial systems; Senior Software Engineer building production SaaS.",
  metadataBase: new URL("https://habib.scholariest.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://habib.scholariest.com",
    siteName: "Academic Portfolio",
    images: [{ url: "/avatar.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = {
    nav: getNav(),
    data: getEntries(),
    profile: getProfile(),
  };

  console.log("content: ", content);

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
      </head>
      <body className="antialiased font-sans">
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />

        {/* <TurnstileGate /> */}

        <ThemeProvider>
          <ContentProvider value={content}>
            <Shell>{children}</Shell>
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
