import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/mainComponents/Navbar'
import Footer from '@/components/mainComponents/Footer'
import '@/css/global.css'
import Head from 'next/head';

import { AuthProvider } from '@/context/authContext'

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
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className='pd-4 bg-white h-2'></div>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}
