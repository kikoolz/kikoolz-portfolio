# Kenneth Kikoole - Portfolio & Blog

<div align="center">

<img 
  src="https://raw.githubusercontent.com/kikoolz/kikoolz-portfolio/main/public/ken-circle.png" 
  alt="Kenneth Kikoole" 
  width="150"
/>

A stunning, high-performance portfolio website that showcases modern web development at its finest. Built with cutting-edge technologies like Next.js, TypeScript, and Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2d3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

**Live Demo** | **Documentation** | **Report Bug**

</div>

---

## 🎯 Why This Project?

This isn't just another portfolio template—it's a production-ready, full-stack application that demonstrates real-world engineering skills. From seamless animations to robust authentication, every feature is crafted with precision and scalability in mind.

## 🚀 Features

### 🎨 **Portfolio & Blog**
- **Stunning UI/UX** with smooth dark/light theme transitions
- **Powerful Blog System** featuring Markdown support and real-time view analytics
- **Dynamic Project Showcase** with smart filtering and categorization
- **Interactive Career Timeline** that tells your professional story
- **Smart Contact Form** with instant email notifications
- **Newsletter Platform** with campaign management and subscriber tracking
- **SEO-First Architecture** with optimized metadata and auto-generated sitemaps

### 🔐 **Admin Dashboard**
- **Secure Authentication** powered by JWT tokens with bcrypt hashing
- **Content Management System** for full blog post lifecycle (create, edit, delete)
- **Project Management** with drag-and-drop image uploads
- **Timeline Editor** for keeping your career journey up-to-date
- **Newsletter Command Center** (subscribers, campaigns, content scheduling)
- **Built-in Analytics** for tracking blog post performance
- **Seamless File Uploads** via UploadThing integration

### ⚡ **Technical Excellence**
- **Lightning-Fast Performance** with optimized loading and caching
- **Bulletproof Type Safety** with comprehensive TypeScript coverage
- **Scalable Database** using Prisma ORM with PostgreSQL (Neon)
- **Real-Time Analytics** powered by Redis cache via Upstash
- **Reliable Email Delivery** through Resend API
- **Smart Image Optimization** with Next.js Image component

## 🛠 Tech Stack

### 🎯 **Frontend**
- **Next.js 16** - Cutting-edge React framework with App Router
- **TypeScript** - Enterprise-grade type safety
- **Tailwind CSS 4** - Modern utility-first styling
- **Framer Motion** - Smooth, performant animations
- **Lucide React** - Beautiful, consistent icons
- **React Markdown** - Seamless Markdown rendering
- **Prism.js** - Developer-friendly syntax highlighting

### 🗄️ **Backend & Database**
- **Prisma 7** - Next-generation database toolkit
- **PostgreSQL** - Robust relational database (Neon hosting)
- **Redis** - Blazing-fast caching and analytics (Upstash)
- **JWT** - Industry-standard authentication
- **bcryptjs** - Military-grade password hashing

### 🌐 **Infrastructure & Services**
- **Vercel** - Lightning-fast deployment platform
- **Resend** - Reliable email delivery at scale
- **UploadThing** - Secure file upload solution
- **Google Analytics** - Comprehensive performance insights

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── blog/           # Blog functionality
│   │   ├── contact/        # Contact form
│   │   ├── newsletter/      # Newsletter management
│   │   ├── projects/        # Project CRUD
│   │   └── timeline/        # Career timeline
│   ├── blog/              # Blog pages
│   ├── dashboard/          # Admin dashboard
│   └── layout.tsx         # Root layout
├── components/             # Reusable React components
│   ├── admin/             # Dashboard components
│   ├── blog/              # Blog-specific components
│   └── [various]         # UI components
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication helpers
│   ├── blog.ts            # Blog utilities
│   └── prisma.ts         # Database client
└── prisma/               # Database schema and migrations
```

## 🚀 Getting Started

### 📋 **Prerequisites**
- Node.js 18+ 
- npm, yarn, or pnpm
- PostgreSQL database (or use Neon for instant setup)
- Redis instance (or use Upstash for managed Redis)

### ⚡ **Quick Start**

1. **Clone and navigate**
   ```bash
   git clone https://github.com/your-username/kikoolz-portfolio.git
   cd kikoolz-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Add your credentials:
   ```env
   # Database
   DATABASE_URL="postgresql://..."
   
   # Authentication
   JWT_SECRET="your-secret-key"
   
   # Redis
   UPSTASH_REDIS_REST_URL="https://..."
   UPSTASH_REDIS_REST_TOKEN="..."
   
   # Email
   RESEND_API_KEY="re_..."
   
   # UploadThing
   UPLOADTHING_SECRET="..."
   UPLOADTHING_APP_ID="..."
   ```

4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Launch development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Visit [http://localhost:3000](http://localhost:3000)** and watch the magic happen!

## 📝 Available Scripts

```bash
npm run dev          # 🚀 Start development server with hot reload
npm run build        # 🏗️  Build for production
npm run start        # ▶️  Start production server
npm run lint         # 🔍 Run ESLint for code quality
```

## 🔧 Configuration

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|-----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Essential |
| `JWT_SECRET` | JWT signing secret | ✅ Essential |
| `UPSTASH_REDIS_REST_URL` | Redis REST URL | ✅ Essential |
| `UPSTASH_REDIS_REST_TOKEN` | Redis auth token | ✅ Essential |
| `RESEND_API_KEY` | Resend API key | ✅ Essential |
| `UPLOADTHING_SECRET` | UploadThing secret | ✅ Essential |
| `UPLOADTHING_APP_ID` | UploadThing app ID | ✅ Essential |

### **Database Schema**

The application leverages these powerful models:
- **User** - Secure authentication and user management
- **Post** - Rich blog posts with Markdown content
- **Project** - Stunning portfolio projects
- **TimelineItem** - Dynamic career timeline entries
- **NewsletterSubscriber** - Engaged email subscribers
- **NewsletterContent** - Professional newsletter campaigns

## 📊 Features in Detail

### ✍️ **Blog System**
- **Live Markdown Editor** with instant preview
- **Smart Categorization** and tagging system
- **Real-Time View Tracking** powered by Redis analytics
- **SEO-Optimized URLs** with automatic metadata
- **RSS Feed Generation** for subscribers

### 🎯 **Project Management**
- **Dynamic Project Cards** with beautiful status badges
- **Seamless Image Upload** with automatic optimization
- **Intelligent Filtering** by technology and status
- **External Link Integration** for live demos

### 🎛️ **Admin Dashboard**
- **Fortress-Level Security** with robust authentication
- **Real-Time Content Management** with instant updates
- **Drag-and-Drop File Upload** for effortless media handling
- **Comprehensive Analytics** and performance metrics

### 📧 **Newsletter System**
- **Subscriber Management** with engagement tracking
- **Campaign Creation** and scheduling tools
- **Rich Content Management** with templates
- **Professional Email Templates** that convert

## 🚀 Deployment

### ☁️ **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch
4. Enjoy global CDN and instant rollbacks!

### 🖥️ **Manual Deployment**
```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request and let's build something awesome together!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Website**: [https://www.kennethkikoole.com](https://www.kennethkikoole.com)
- **Email**: contact@kennethkikoole.com
- **GitHub**: [Your GitHub Profile](https://github.com/your-username)

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

*Turning messy problems into clean & efficient code since 2024*

</div>
