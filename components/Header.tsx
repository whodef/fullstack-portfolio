'use client';

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/40 border-b border-black/5 dark:border-white/10 shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-brand-50/10 to-white/5 dark:from-black/5 dark:via-brand-900/10 dark:to-black/5 pointer-events-none"></div>
      
      <div className="container flex items-center justify-between h-16 relative z-10">
        <Link 
          href="/" 
          className="group relative font-extrabold tracking-tight text-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-400/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="relative z-10">
            Tatiana S<span className="text-brand-500 group-hover:text-brand-600 transition-colors duration-300">.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-lg">
          <Link 
            href="/projects" 
            className="group relative overflow-hidden px-2 py-1 rounded-lg hover:text-brand-500 transition-colors duration-300"
          >
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-400 to-brand-600 group-hover:w-full transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-100/40 dark:via-brand-900/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            <span className="relative z-10">Projects</span>
          </Link>

          <Link 
            href="/about" 
            className="group relative overflow-hidden px-2 py-1 rounded-lg hover:text-brand-500 transition-colors duration-300"
          >
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-400 to-brand-600 group-hover:w-full transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-100/40 dark:via-brand-900/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            <span className="relative z-10">About</span>
          </Link>

          <Link 
            href="/contact" 
            className="group relative overflow-hidden px-2 py-1 rounded-lg hover:text-brand-500 transition-colors duration-300"
          >
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-400 to-brand-600 group-hover:w-full transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-100/40 dark:via-brand-900/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            <span className="relative z-10">Contacts</span>
          </Link>

          {mounted && (
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme((resolvedTheme === 'dark') ? 'light' : 'dark')}
              className="group relative overflow-hidden rounded-xl px-3 py-1.5 bg-white/80 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 border border-black/10 dark:border-white/20 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10 text-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 inline-block">
                {resolvedTheme === 'dark' ? '🌤️' : '🌙'}
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-400/10 via-transparent to-brand-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          )}
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent"></div>
    </header>
  )
}
