import "@/app/globals.css";

import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ContentProvider } from "@/context/ContentProvider";

import Shell from "@/components/Shell";
import ThemeProvider from "@/components/ThemeProvider";
import { getBlogPosts, getEducation, getExperience, getHome, getNav, getProfile, getProjectDetails, getProjects, getPublications } from "@/lib/data";

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
    profile: getProfile(),
    home: getHome(),
    education: getEducation(),
    experience: getExperience(),
    projects: getProjects(),
    publications: getPublications(),
    blogposts: getBlogPosts(),
    details: getProjectDetails(),
  };

  // console.log("content: ", content);

  return (
    // suppressHydrationWarning is necessary for next-themes
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <ContentProvider value={content}>
            <Shell>{children}</Shell>
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
