import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/mainComponents/Navbar'
import Footer from '@/components/mainComponents/Footer'
import { TenderProvider } from '@/components/TenderContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Asian Tender',
  description: 'Asian Tender',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TenderProvider>
    <html lang="en">
      <body className={inter.className}>      
      <Navbar />
      <main>{children}</main>
      <Footer />
      </body>
    </html>
    </TenderProvider>
  )
}
