export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Tatiana — Fullstack Developer</p>
        <div className="flex gap-4">
          <a href="https://github.com/whodef" target="_blank" rel="noreferrer" className="hover:text-brand-500">GitHub</a>
          <a href="https://www.linkedin.com/in/tatiana-seliuk/" target="_blank" rel="noreferrer" className="hover:text-brand-500">LinkedIn</a>
          <a href="https://t.me/whodef/" target="_blank" rel="noreferrer" className="hover:text-brand-500">Telegram</a>
        </div>
      </div>
    </footer>
  )
}