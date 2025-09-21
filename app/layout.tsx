import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" });

const siteUrl = "https://infoverse.education";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Infoverse Digital-Ed | Cambridge, AQA, EDEXCEL, OCR, IB & GCSE Courses",
    template: "%s | Infoverse Digital-Ed",
  },
  description:
    "Discover exam board-aligned online courses for Cambridge, AQA, EDEXCEL, OCR, IB Diploma, GCSE and A-Level students. Subscribe for flexible, expert-led study plans and measurable results.",
  keywords: [
    "Infoverse",
    "online courses",
    "Cambridge",
    "AQA",
    "EDEXCEL",
    "OCR",
    "IB Diploma",
    "GCSE",
    "A-Level",
    "exam preparation",
    "digital learning",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Infoverse Digital-Ed | Flexible Courses for Global Exam Boards",
    description:
      "Explore personalized, exam board-aligned learning paths with expert instructors, real-time analytics, and transparent subscription pricing.",
    siteName: "Infoverse Digital-Ed",
    images: [
      {
        url: `${siteUrl}/og-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Infoverse Digital-Ed course catalog preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@infoverse",
    creator: "@infoverse",
    title: "Infoverse Digital-Ed | Flexible Courses for Global Exam Boards",
    description:
      "Compare Infoverse subscription plans and enroll in flexible online courses for Cambridge, AQA, EDEXCEL, OCR, IB Diploma, GCSE, and A-Level.",
    images: [`${siteUrl}/og-cover.jpg`],
  },
  category: "education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}

        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-setup" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        ) : null}

        {metaPixelId ? (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
