'use client';

import { motion } from 'framer-motion'
import ProjectGrid from '@/components/ProjectGrid'
import Pagination from '@/components/Pagination'
import { usePagination } from './../hooks/usePagination'
import type { Project } from '@/components/ProjectGrid'

interface ProjectsWithPaginationProps {
  projects: Project[]
  itemsPerPage?: number
}

export default function ProjectsWithPagination({ 
  projects, 
  itemsPerPage = 9 
}: ProjectsWithPaginationProps) {
  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    startIndex,
    endIndex,
    totalItems
  } = usePagination({ 
    items: projects, 
    itemsPerPage 
  })

  return (
    <div className="space-y-12">
      <motion.div
        id="projects-grid"
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ProjectGrid items={currentItems} />
      </motion.div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  )
}
