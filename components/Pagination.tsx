'use client';

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PaginationModern({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    let start = currentPage - 1
    let end = currentPage + 1

    if (start < 1) {
      start = 1
      end = 3
    }
    
    if (end > totalPages) {
      end = totalPages
      start = totalPages - 2
    }

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 mt-16"
    >
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-30 transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-300/60 dark:hover:border-brand-600/60 hover:shadow-lg dark:hover:shadow-brand-500/10 bg-white/80 dark:bg-gray-800/80"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-100/40 dark:via-brand-400/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-50/30 via-brand-100/20 to-brand-50/30 dark:from-brand-900/20 dark:via-brand-800/10 dark:to-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <FontAwesomeIcon 
          icon={faChevronLeft} 
          className="w-3 h-3 relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300" 
        />
      </motion.button>

      <div className="flex items-center gap-1">
        {visiblePages.map((pageNumber, index) => {
          const isActive = pageNumber === currentPage

          return (
            <motion.button
              key={pageNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.4,
                ease: "easeOut"
              }}
              onClick={() => onPageChange(pageNumber)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                group relative w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 overflow-hidden
                ${isActive 
                  ? 'border border-brand-400/60 dark:border-brand-500/60 bg-brand-50/50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 shadow-md shadow-brand-500/10' 
                  : 'border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-300/60 dark:hover:border-brand-600/60 hover:shadow-lg dark:hover:shadow-brand-500/10 bg-white/80 dark:bg-gray-800/80'
                }
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-100/40 dark:via-brand-400/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-50/30 via-brand-100/20 to-brand-50/30 dark:from-brand-900/20 dark:via-brand-800/10 dark:to-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {isActive && (
                <motion.div
                  layoutId="activePage"
                  className="absolute inset-0 bg-brand-50/50 dark:bg-brand-900/30"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              
              <span className={`relative z-10 transition-colors duration-300 ${
                isActive 
                  ? 'text-brand-700 dark:text-brand-300' 
                  : 'text-gray-700 dark:text-gray-300 group-hover:text-brand-600 dark:group-hover:text-brand-400'
              }`}>
                {pageNumber}
              </span>
            </motion.button>
          )
        })}
      </div>

      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-30 transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-brand-300/60 dark:hover:border-brand-600/60 hover:shadow-lg dark:hover:shadow-brand-500/10 bg-white/80 dark:bg-gray-800/80"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-100/40 dark:via-brand-400/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-50/30 via-brand-100/20 to-brand-50/30 dark:from-brand-900/20 dark:via-brand-800/10 dark:to-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <FontAwesomeIcon 
          icon={faChevronRight} 
          className="w-3 h-3 relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300" 
        />
      </motion.button>
    </motion.div>
  )
}
