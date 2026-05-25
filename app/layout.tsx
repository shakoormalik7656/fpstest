import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fpstest.pro'),
  title: {
    default: 'FPS Test — Free Browser FPS & Gaming Performance Tests',
    template: '%s | FPS Test',
  },
  description:
    'Free browser-based FPS and gaming performance tests. No download, no signup. Test your frame rate, monitor Hz, input lag, and more instantly.',
  keywords: ['fps test', 'fps meter', 'frame rate test', 'monitor hz test', 'gaming performance'],
  authors: [{ name: 'FPS Test' }],
  creator: 'FPS Test',
  verification: {
    google: 'V5n9v8b_RUGdY7hpCNKVXt6s4oWPRuVxyP8mnAk6O2M',
  },
  icons: {
    icon: [
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-512x512.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon-512x512.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fpstest.pro',
    siteName: 'FPS Test',
    title: 'FPS Test - Free Browser FPS & Gaming Performance Tests',
    description:
      'Free browser-based FPS and gaming performance tests. No download, no signup. Test your frame rate, monitor Hz, input lag, and more instantly.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FPS Test - Free Online FPS Tester',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FPS Test — Free Browser FPS & Gaming Performance Tests',
    description:
      'Free browser-based FPS and gaming performance tests. No download, no signup.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://fpstest.pro',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark`}
      style={{ backgroundColor: 'var(--bg-primary)' }}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FPMQVHBNER"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FPMQVHBNER');
          `}
        </Script>
      </body>
    </html>
  )
}
