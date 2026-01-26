import type { Metadata } from "next";
import { Outfit, Audiowide } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBlocker } from "@/components/MobileBlocker";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
});

const audiowide = Audiowide({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-audiowide'
});

export const metadata: Metadata = {
  title: "Nyra | Manage Less. Do More.",
  description: "The all-in-one Discord platform for moderation, economy, and community engagement.",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${audiowide.variable}`}>
      <body className="font-sans antialiased bg-[#030305] text-white min-h-screen flex flex-col">
        <Navbar />
        <MobileBlocker />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
