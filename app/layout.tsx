import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tatiana Seliuk — Fullstack Developer',
  description: 'Portfolio of a fullstack developer: Next.js, TypeScript, Python, GraphQL',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen text-gray-900 dark:text-gray-100 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0b0f14] dark:to-[#0a0c10]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}