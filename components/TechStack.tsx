'use client';

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiReact, 
  SiPython, 
  SiFastapi, 
  SiGraphql, 
  SiPostgresql, 
  SiDocker,
  SiJavascript,
  SiNodedotjs,
  SiReactos,
  SiDjango,
  SiRedux
} from 'react-icons/si'
import { IoStorefront } from 'react-icons/io5'

const tech = [
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'React Native', icon: SiReactos, color: '#61DAFB' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Django', icon: SiDjango, color: '#092E20' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC' },
  { name: 'Zustand', icon: IoStorefront, color: '#FF6B6B' }
]

export default function TechStack() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {tech.map((item, i) => {
        const IconComponent = item.icon
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ 
              delay: i * 0.05,
              duration: 0.4,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              transition: { duration: 0.2 }
            }}
            className="group relative card px-4 py-3 text-center text-sm font-medium cursor-default hover:shadow-lg dark:hover:shadow-brand-500/10 transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-300 dark:hover:border-brand-600"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-100/40 dark:via-brand-400/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-50/30 via-brand-100/20 to-brand-50/30 dark:from-brand-900/20 dark:via-brand-800/10 dark:to-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <IconComponent 
                className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                style={{ 
                  color: item.color,
                  filter: 'brightness(0.8) contrast(1.2)'
                }}
              />
              <span className="group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                {item.name}
              </span>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        )
      })}
    </div>
  )
}
