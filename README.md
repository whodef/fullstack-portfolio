# Fullstack Developer Portfolio — Next.js 15

A modern, responsive portfolio template for fullstack developers built with **Next.js 15**, **Tailwind CSS**, **Framer Motion**, and **next-themes**.

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue)](https://github.com/whodef/fullstack-portfolio/actions)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://whodef.github.io/fullstack-portfolio/)

## ✨ Features

- 🎨 **Modern Design** - Clean, professional interface with glassmorphism effects
- 🌙 **Dark/Light Mode** - Seamless theme switching with `next-themes`
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- ⚡ **Performance Optimized** - Built with Next.js 15 for lightning-fast loading
- 🎭 **Smooth Animations** - Beautiful transitions powered by Framer Motion
- 📧 **Contact Form** - Integrated email functionality with Nodemailer
- 🔧 **Tech Stack Display** - Dynamic showcase of your skills and technologies
- 📊 **GitHub Integration** - Automatically fetches and displays your repositories
- 🚀 **Easy Deployment** - Ready for Vercel, GitHub Pages, or any static hosting

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** FontAwesome & React Icons
- **Theme:** next-themes
- **Email:** Nodemailer
- **TypeScript:** Full type safety
- **Package Manager:** pnpm

## 🚀 Quick Start

### Development
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
# Open http://localhost:3000
```

### Production
```bash
# Build for production
pnpm build

# Start production server
pnpm run deploy
```

### Build for GitHub Pages
```bash
# Build and prepare for static hosting
pnpm run build:pages
```

## 📁 Project Structure

```
fullstack-portfolio/
├── app/                   # Next.js app directory
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   └── api/contact/       # Email API endpoint
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── ContactForm.tsx    # Contact form with validation
│   ├── ProjectGrid.tsx    # Projects grid layout
│   └── TechStack.tsx      # Technology showcase
├── lib/                   # Utility functions
│   ├── github.ts          # GitHub API integration
│   └── projects.ts        # Project data management
└── public/                # Static assets
```

## ⚙️ Configuration

### 1. Personal Information
Update your details in:
- `app/layout.tsx` - Site metadata
- `app/about/page.tsx` - About section content
- `components/TechStack.tsx` - Your tech stack
- `lib/projects.ts` - Featured projects

### 2. GitHub Integration
Edit `lib/projects.ts` to configure which repositories to display:

```typescript
export const githubProjectsConfig: Record<string, {
  enabled?: boolean
  override?: Partial<Project>
}> = {
  'your-repo-name': {
    override: {
      title: 'Custom Title',
      description: 'Your project description',
      tech: ['React', 'TypeScript', 'Node.js']
    }
  }
}
```

### 3. Contact Form
Set up environment variables for the contact form:

```bash
# .env.local
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

## 🚀 Deployment Options

### GitHub Pages (Current Setup)
1. Push to your repository
2. GitHub Actions will automatically build and deploy
3. Site will be available at `https://yourusername.github.io/repository-name/`

### Vercel
1. Import repository on [Vercel](https://vercel.com)
2. Deploy automatically

### Other Platforms
The project exports as static files and works on any static hosting:
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## 🎨 Customization

### Colors & Branding
Modify the brand colors in `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    50: '#ecfeff',
    500: '#06b6d4', // Primary brand color
    900: '#164e63'
  }
}
```

### Animations
Customize animations in components using Framer Motion:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/whodef/fullstack-portfolio/issues).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

Built with ❤️ by [Tatiana S.](https://github.com/whodef)
