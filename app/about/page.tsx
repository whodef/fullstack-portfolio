export const metadata = { title: 'About — Tatiana' }

export default function AboutPage() {
  return (
    <section className="container py-20 max-w-3xl">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">About me</h1>
      <div className="prose dark:prose-invert max-w-none text-left text-lg md:text-xl">
        <p className="">
          I’m a full-stack developer with 7+ years of experience. I enjoy system design, strict typing,
          and product-oriented development. I build reliable web applications with <strong>Next.js</strong> and <strong>Python</strong>,
          design APIs, and set up CI/CD and infrastructure.
        </p>
        <br />
        <ul>
          <li><strong>Frontend</strong>: React/Next.js, TypeScript, Zustand, Tailwind</li>
          <br />
          <li><strong>Backend</strong>: Python 3, FastAPI, Node.js, GraphQL, PostgreSQL</li>
          <br />
          <li><strong>DevOps</strong>: Docker, GitHub Actions, Vercel</li>
        </ul>
      </div>
    </section>
  )
}