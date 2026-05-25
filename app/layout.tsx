import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
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
        alt: 'FPS Test — Free Gaming Performance Tests',
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
      </body>
    </html>
  )
}
