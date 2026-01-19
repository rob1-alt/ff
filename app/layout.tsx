import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import Script from "next/script";
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#F5F0E8" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N7TMC6DR');
          `}
        </Script>
      </head>
      <body className={`${cormorant.variable} ${instrumentSans.variable} antialiased bg-[#F5F0E8]`}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-N7TMC6DR"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
