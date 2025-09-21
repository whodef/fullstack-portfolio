import ProjectsWithPagination from '@/components/ProjectsWithPagination'
import ProjectGrid from '@/components/ProjectGrid'
import { staticProjects, processGitHubProjects } from '@/lib/projects'
import { fetchRecentRepos } from '@/lib/github'

export const metadata = {
  title: 'Projects — Tatiana'
}

export default async function ProjectsPage() {
  try {
    const ghRepos = await fetchRecentRepos('whodef', 100)
    const githubProjects = processGitHubProjects(ghRepos)
    const uniqueGitHubProjects = githubProjects.filter(ghProject => 
      !staticProjects.some(staticProject => staticProject.title === ghProject.title)
    )

    return (
      <section className="container py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete collection of my projects — from commercial solutions to open-source experiments.
          </p>
        </div>

        {staticProjects.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
              <h2 className="text-2xl font-bold mx-6 text-gray-900 dark:text-white">
                Featured Work
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Handpicked selection of my best commercial and personal projects
            </p>
            <ProjectGrid items={staticProjects} isFeatured={true} />
          </div>
        )}

        {uniqueGitHubProjects.length > 0 && (
          <div>
            <div className="flex items-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
              <h2 className="text-2xl font-bold mx-6 text-gray-900 dark:text-white">
                Open Source
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Recent repositories and experiments from GitHub • {uniqueGitHubProjects.length} projects
            </p>
            <ProjectsWithPagination 
              projects={uniqueGitHubProjects} 
              itemsPerPage={6}
            />
          </div>
        )}

        {staticProjects.length === 0 && uniqueGitHubProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400">
              No projects available at the moment.
            </p>
          </div>
        )}
      </section>
    )
  } catch (error) {
    // Fallback on static projects if GitHub API is unavailable
    return (
      <section className="container py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Selected projects from my portfolio
          </p>
        </div>
        <ProjectGrid items={staticProjects} />
      </section>
    )
  }
}
