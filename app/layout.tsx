import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fontaine Founders",
  description: "Join the waitlist for something extraordinary. Be among the first to experience what's next in innovation.",
  icons: {
    icon: "/logoFF.png",
    apple: "/logoFF.png",
  },
  openGraph: {
    title: "Fontaine Founders",
    description: "Join the waitlist for something extraordinary. Be among the first to experience what's next in innovation.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Fontaine Founders",
      },
    ],
    type: "website",
    siteName: "Fontaine Founders",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fontaine Founders",
    description: "Join the waitlist for something extraordinary.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${instrumentSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
