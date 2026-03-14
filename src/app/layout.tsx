import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rwabase.vercel.app'

export const metadata: Metadata = {
  title: {
    default: 'RWAbase — 국내 유일 RWA 프로젝트 트래킹',
    template: '%s — RWAbase',
  },
  description: 'Real World Asset(RWA) 프로젝트를 한눈에. 부동산, 채권, 미술품, 원자재 토큰화 프로젝트를 추적하세요.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: 'RWAbase',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geist.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
