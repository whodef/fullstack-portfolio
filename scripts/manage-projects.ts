/**
 * A utility for viewing all available GitHub repositories
 * and generating configurations for them
 **/

interface Repo {
  name: string
  description: string | null
  html_url: string
  homepage?: string | null
  topics?: string[]
  updated_at: string
}

async function fetchAllRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
  if (!res.ok) throw new Error('Failed to fetch repos')
  return res.json()
}

async function generateProjectsConfig() {
  try {
    const repos = await fetchAllRepos('whodef')
    
    console.log('🔍 Found repositories:\n')
    
    repos.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.name}`)
      console.log(`   📝 ${repo.description || 'No description'}`)
      console.log(`   🏷️  ${repo.topics?.join(', ') || 'No tags'}`)
      console.log(`   📅 ${new Date(repo.updated_at).toLocaleDateString('en')}`)
      console.log(`   🔗 ${repo.html_url}`)
      console.log('')
    })
    
    console.log('\n📋 Generated config for copying:')
    console.log('=====================================\n')
    
    const configTemplate = repos.map(repo => {
      return `  '${repo.name}': {
    // enabled: false, // 👈 uncomment to HIDE project
    override: {
      title: '${repo.name}',
      description: '${repo.description || 'Project description'}',
      tech: ${JSON.stringify(repo.topics?.slice(0, 4) || ['JavaScript'])},
      // image: '/projects/${repo.name}.jpg' // add if you have screenshots
    }
  },`
    }).join('\n')
    
    console.log(configTemplate)
    
    console.log('\n\n💡 Instructions:')
    console.log('1. ALL projects are shown by default')
    console.log('2. To HIDE a project: add enabled: false')
    console.log('3. To OVERRIDE: edit the override block')
    console.log('4. Add image if you have screenshots')
    console.log('5. Forks and projects without description are filtered automatically')
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

generateProjectsConfig();
