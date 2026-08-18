import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AmbientBackground } from "@/components/background/AmbientBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505", // Deep midnight indigo to match our --primary
};

export const metadata: Metadata = {
  title: "Redroot | The Nightly Ritual",
  description: "Some brands give you wings. We bring you home. A premium sleep and stillness tea ritual brand.",
  metadataBase: new URL('https://redroot.vercel.app'),
  openGraph: {
    title: "Redroot | The Nightly Ritual",
    description: "A premium sleep and stillness tea ritual brand for people who run too fast.",
    siteName: "Redroot",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redroot | The Nightly Ritual",
    description: "A premium sleep and stillness tea ritual brand for people who run too fast.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col relative z-0">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
