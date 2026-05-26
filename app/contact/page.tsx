import type { Metadata } from 'next'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Contact FPS Test — Send Us a Message',
  description:
    'Contact the FPS Test team. Report a bug, suggest a new tool, ask a question, or share feedback about our free browser-based gaming performance tests.',
  alternates: { canonical: 'https://fpstest.pro/contact' },
  openGraph: {
    title: 'Contact FPS Test — Send Us a Message',
    description:
      'Contact the FPS Test team. Report a bug, suggest a new tool, ask a question, or share feedback.',
    url: 'https://fpstest.pro/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FPS Test - Free Online FPS Tester' }],
  },
}

export default function ContactPage() {
  return <ContactForm />
}
