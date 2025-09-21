export interface Repo {
  name: string
  description: string | null
  html_url: string
  homepage?: string | null
  topics?: string[]
}

export async function fetchRecentRepos(username: string, limit = 6): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=${limit}&sort=updated`, {
    headers: { 'Accept': 'application/vnd.github+json' },
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data as Repo[]
}