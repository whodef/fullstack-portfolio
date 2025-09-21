import ProjectItem from './ProjectItem'

export interface Project {
  title: string
  description: string
  tech: string[]
  image?: string
  href?: string
  repo?: string
}

export default function ProjectGrid({ items, isFeatured = false }: { items: Project[]; isFeatured?: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <ProjectItem key={p.title} project={p} isFeatured={isFeatured} />
      ))}
    </div>
  )
}