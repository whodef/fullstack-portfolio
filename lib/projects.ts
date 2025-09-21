import type { Project } from '@/components/ProjectGrid'

export const githubProjectsConfig: Record<string, {
  enabled?: boolean
  override?: Partial<Project>
}> = {
  'whodef': {
    enabled: false,
  },
  'algorithms_and_data_structures': { 
    override: {
      title: 'Algorithms and Data Structures',
      description: 'Implementation of classic algorithms and data structures in Python. Sorting, trees, graphs, hash tables.',
      tech: ['Python'],
      image: ''
    }
  },
  'api_yamdb': {
    override: {
      title: 'Yamdb API',
      description: 'REST API for movie and book review service. Django REST Framework, JWT, pagination, filters.',
      tech: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Docker'],
      image: ''
    }
  },
  'code-kata': {
    override: {
      title: 'Code Kata',
      description: 'Codewars challenge solutions in Python. Algorithms, data structures, string, number, and array problems.',
      tech: ['Python'],
      image: ''
    }
  },
  'yatube_project': {
    override: {
      title: 'Yatube Social',
      description: 'Social network for bloggers. Django, authentication, pagination, forms, admin panel.',
      tech: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      image: ''
    }
  },
  'yamdb_final': {
    override: {
      title: 'Yamdb Final',
      description: 'REST API for movie and book review service. Django REST Framework, JWT, pagination, filters.',
      tech: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Docker'],
      image: ''
    }
  },
  'api_final_yatube': {
    override: {
      title: 'Yatube API',
      description: 'REST API for blogger social network. Django REST Framework, JWT, pagination, filtering.',
      tech: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Docker'],
      image: ''
    }
  },
  'api_yatube': {
    enabled: false,
    override: {
      title: 'Yatube API (old)',
      description: 'REST API for blogger social network. Django REST Framework, JWT, pagination, filtering.',
      tech: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Docker'],
      image: ''
    }
  },
  'homework_bot': {
    override: {
      title: 'Homework Bot',
      description: 'Telegram bot for checking homework status on Yandex.Practicum. Python, requests, Telegram Bot API.',
      tech: ['Python', 'Requests', 'Telegram Bot API'],
      image: ''
    }
  },
  'react-components-lib': {
    override: {
      title: 'React UI Kit',
      description: 'Library of reusable React components with TypeScript and Storybook.',
      tech: ['React', 'TypeScript', 'Storybook', 'CSS Modules'],
      image: ''
    }
  },
  'mesto-react': {
    override: {
      title: 'Mesto React',
      description: 'Social network for photo sharing. React, REST API, authentication, responsive design.',
      tech: ['React', 'TypeScript', 'Storybook', 'CSS Modules'],
      image: ''
    }
  },
  'bbbs': {
    // enabled: false,
    override: {
      title: 'BBBS',
      description: 'Website for Big Brothers Big Sisters charity organization. Responsive design, forms, animations.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: ''
    }
  },
  'mesto': {
    // enabled: false,
    override: {
      title: 'Mesto',
      description: 'Social network for photo sharing. REST API, authentication, responsive design.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: ''
    }
  },
  'mesto-main': {
    // enabled: false,
    override: {
      title: 'Mesto Main',
      description: 'Landing page for Mesto social network. Responsive design, forms, animations.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: ''
    }
  },
  'russian-travel': {
    override: {
      title: 'Russian Travel',
      description: 'Travel website showcasing Russian destinations. Responsive design, CSS Grid, semantic HTML.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: ''
    }
  },
  'how-to-learn': {
    override: {
      title: 'How to Learn',
      description: 'Landing page for self-development online course. Responsive design, forms, animations.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: ''
    }
  },
  'hw_python_oop': {
    override: {
      title: 'Python OOP',
      description: 'Practical assignments for "Object-Oriented Programming in Python" course.',
      tech: ['Python'],
      image: ''
    }
  },
  'movies-explorer-api': {
    override: {
      title: 'Movies Explorer API',
      description: 'Backend for movie search service. Node.js, Express, MongoDB, authentication, REST API.',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      image: ''
    }
  },
  'react-mesto-auth': {
    override: {
      title: 'Mesto React Auth',
      description: 'Social network for photo sharing. React, REST API, authentication, responsive design.',
      tech: ['React', 'JavaScript', 'REST API', 'CSS Modules'],
      image: ''
    }
  },
  'studio_lubimovka_test': {
    override: {
      title: 'Lubimovka Test',
      description: 'Test assignment for Lubimovka studio. Landing page with responsive design, forms and animations.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: ''
    }
  }
}

// Static projects (not on GitHub or private)
export const staticProjects: Project[] = [
  {
    title: 'Skolkovo Golf — Dashboard',
    description: 'Personal dashboard with bookings, notifications, statistics. Next.js + SSR, Zustand, complex UI components.',
    tech: ['Next.js', 'TypeScript', 'Zustand', 'SCSS', 'Framer Motion'],
    image: '/projects/image2.webp',
    href: 'https://demo-link.com',
    repo: 'https://github.com/private/repo'
  },
]

export function processGitHubProjects(repos: any[]): Project[] {
  return repos
    .filter(repo => {
      const config = githubProjectsConfig[repo.name]
      return config?.enabled !== false
    })
    .filter(repo => {
      if (repo.fork && !githubProjectsConfig[repo.name]) return false

      if (!repo.description && !repo.topics?.length && !githubProjectsConfig[repo.name]?.override) {
        return false
      }
      
      return true
    })
    .slice(0, 50)
    .map(repo => {
      const config = githubProjectsConfig[repo.name]
      const override = config?.override || {}
      
      const baseProject: Project = {
        title: repo.name,
        description: repo.description || `Open-source project: ${repo.name}`,
        tech: repo.topics?.length ? repo.topics.slice(0, 4) : ['JavaScript'],
        href: repo.homepage || repo.html_url,
        repo: repo.html_url
      }
      
      if (!override.image) {
        const possibleImages = [
          `/projects/${repo.name}.jpg`,
          `/projects/${repo.name}.png`,
          `/projects/${repo.name}.webp`
        ]
      }
      
      return {
        ...baseProject,
        ...override
      }
    })
}
