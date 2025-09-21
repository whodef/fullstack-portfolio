'use client';

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faCodeBranch, faCode, faFolder, faStar } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import type { Project } from './ProjectGrid'

// Fallback component when there's no image
function ProjectFallback({ title, tech }: { title: string; tech: string[] }) {
  const getGradientFromTitle = (title: string) => {
    const colors = [
      'from-blue-200 to-indigo-300',
      'from-emerald-200 to-teal-300',
      'from-rose-200 to-pink-300',
      'from-purple-200 to-violet-300',
      'from-amber-200 to-orange-300',
      'from-green-200 to-lime-300',
      'from-cyan-200 to-sky-300',
      'from-fuchsia-200 to-purple-300',
    ]
    
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
  }

  // Determine icon based on technologies
  const getIconByTech = (tech: string[]) => {
    const firstTech = tech[0]?.toLowerCase()
    if (firstTech?.includes('react') || firstTech?.includes('next')) return faCode
    if (firstTech?.includes('api') || firstTech?.includes('node')) return faFolder
    return faCode
  }

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${getGradientFromTitle(title)} flex items-center justify-center`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Central icon */}
      <div className="relative z-10 text-white/90">
        <FontAwesomeIcon 
          icon={getIconByTech(tech)} 
          className="w-12 h-12 mb-2" 
        />
        <div className="text-xs font-medium text-center opacity-80">
          {tech[0] || 'Project'}
        </div>
      </div>
      
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  )
}

export default function ProjectItem({ project, isFeatured = false }: { project: Project; isFeatured?: boolean }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className="group card overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
        
        {/* Project image */}
        {project.image && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse z-10" />
            )}
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className={`object-cover transform group-hover:scale-105 transition-all duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true)
                setImageLoading(false)
              }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </>
        ) : (
          // Fallback when no image or loading error
          <ProjectFallback title={project.title} tech={project.tech} />
        )}
        
        {/* Floating glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {/* Project status badge */}
        <div className="absolute top-3 right-3 z-30">
          {isFeatured ? (
            <div className="w-8 h-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center transform rotate-12 shadow-lg border border-white/30 dark:border-white/10">
              <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-amber-400" />
            </div>
          ) : project.href ? (
           <div className="w-8 h-8 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center transform rotate-12 shadow-lg border border-white/30 dark:border-white/10">
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </div>
          ) : null}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col relative">
        <h3 className="text-lg font-bold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex-1 leading-relaxed">
          {project.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {project.tech.map((t) => (
            <span 
              key={t} 
              className="rounded-lg border border-gray-200/70 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:border-brand-200 dark:hover:border-brand-700 hover:text-brand-700 dark:hover:text-brand-300 transition-all duration-200"
            >
              {t}
            </span>
          ))}
        </div>
        
        <div className="mt-5 flex gap-3 text-sm">
          {/* Demo Button */}
          {project.href && (
            <a 
              className="group/demo relative ring-accent px-3 py-2 rounded-xl bg-white/70 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 transform hover:scale-105 transition-all duration-300 overflow-hidden flex items-center gap-2"
              href={project.href} 
              target="_blank" 
              rel="noreferrer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/25 to-transparent transform -skew-x-12 -translate-x-full group-hover/demo:translate-x-full transition-transform duration-700" />
              <FontAwesomeIcon 
                icon={faEye} 
                className="w-3 h-3 transform group-hover/demo:scale-110 transition-transform duration-300 relative z-10" 
              />
              <span className="relative z-10">Demo</span>
            </a>
          )}
          
          {/* GitHub Button */}
          {project.repo && (
            <a 
              className="group/github relative ring-accent px-3 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white transform hover:scale-105 transition-all duration-300 overflow-hidden flex items-center gap-2"
              href={project.repo} 
              target="_blank" 
              rel="noreferrer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 -translate-x-full group-hover/github:translate-x-full transition-transform duration-700" />
              <FontAwesomeIcon 
                icon={faCodeBranch} 
                className="w-3 h-3 transform group-hover/github:rotate-12 transition-transform duration-300 relative z-10" 
              />
              <span className="relative z-10">GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}