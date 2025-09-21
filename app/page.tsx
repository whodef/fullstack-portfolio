'use client';

import { motion } from 'framer-motion'
import Link from 'next/link'
import TechStack from '@/components/TechStack'

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero */}
      <div className="container py-20 md:pt-36">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Hi! I'm <span className="text-brand-500">Tatiana</span>,<br />
            a full-stack developer.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
        >
          TypeScript • Next.js • Python • GraphQL • PostgreSQL • Docker • CI/CD
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex gap-4"
        >
          {/* Primary Button - Projects */}
          <Link 
            href="/projects" 
            className="group relative px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center gap-2">
              Projects
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
          
          {/* Secondary Button - Contacts */}
          <Link 
            href="/contact" 
            className="group relative px-8 py-4 bg-white/70 dark:bg-white/10 backdrop-blur border border-white/20 dark:border-white/20 hover:bg-white/90 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* Glass morphism shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contacts
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced Gradient Orbs with animation */}
      <div className="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
          className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" 
        />
      </div>

      {/* Tech stack with enhanced card */}
      <div className="container pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="group card p-8 md:p-10 mt-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-900/90"
        >
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <TechStack />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
