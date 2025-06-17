import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/layout/ClientLayout'
import { DarkModeProvider } from '@/contexts/DarkModeContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Range Ops - Shooting Range Management',
  description: 'Professional shooting range target scoring and ranking system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkModeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </DarkModeProvider>
      </body>
    </html>
  )
}