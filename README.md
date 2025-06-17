# Target Practice - Shooting Range Management System

A comprehensive web application for managing shooting range operations, tracking performance, and providing real-time monitoring of range activities. Built with Next.js 15, TypeScript, and Tailwind CSS with full dark mode support.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd target-practice
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📋 Overview

Target Practice is a modern shooting range management system designed to streamline range operations, enhance safety protocols, and provide comprehensive performance tracking for both individual shooters and range administrators.

### Key Features

- **Real-time Range Monitoring** - Live tracking of active shooting sessions and lane status
- **Performance Analytics** - Comprehensive shooting statistics and performance metrics
- **Session Management** - Create, monitor, and manage shooting sessions
- **Dark/Light Mode** - Full theme support with user preference persistence
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with smooth animations

## 🏗️ System Architecture

### Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Development Tools**: ESLint, PostCSS

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages (login, register)
│   ├── admin/             # Admin dashboard
│   ├── analytics/         # Analytics and reports
│   ├── personnel/         # Staff management
│   ├── profile/           # User profiles
│   ├── rankings/          # Competition rankings
│   │   ├── overall/       # All-time rankings
│   │   └── weekly/        # Weekly competitions
│   └── shooting/          # Shooting session management
│       ├── active/        # Active sessions monitoring
│       └── new/           # New session creation
├── components/            # Reusable React components
│   ├── layout/           # Layout components
│   └── ComingSoon.tsx    # Coming soon placeholder
├── contexts/             # React contexts
│   └── DarkModeContext.tsx
├── hooks/                # Custom React hooks
│   └── useShootingSession.ts
└── types/                # TypeScript type definitions
    └── shooting.ts
```

## 🎯 Features & Modules

### 📊 Dashboard
- Real-time system status monitoring
- Quick action shortcuts
- Recent activity feed
- Live clock and date display
- System health indicators

### 🎯 Shooting Sessions
- **New Session Creation** ✅ *Available*
  - Session configuration and setup
  - Equipment selection
  - Safety protocol checklists
  
- **Active Sessions** 🚧 *Coming Feb 2025*
  - Real-time session monitoring
  - Lane status overview
  - Emergency controls

### 📈 Analytics & Reports
- **Analytics Dashboard** 🚧 *Coming March 2025*
  - Performance trend analysis
  - Statistical insights
  - Custom date filtering
  
- **Custom Reports** 🚧 *Coming April 2025*
  - Report builder
  - Multiple export formats
  - Scheduled reporting

### 🏆 Rankings & Competition
- **Overall Rankings** 🚧 *Coming May 2025*
  - All-time leaderboards
  - Multi-discipline tracking
  
- **Weekly Rankings** 🚧 *Coming April 2025*
  - Weekly competitions
  - Dynamic leaderboards

### 👥 User Management
- **Personnel Management** 🚧 *Coming Feb 2025*
  - Staff scheduling
  - Role-based permissions
  
- **User Profiles** 🚧 *Coming March 2025*
  - Personal settings
  - Achievement tracking

### 🔐 Authentication & Security
- **Login/Register System** 🚧 *Coming Jan 2025*
  - Secure authentication
  - Role-based access control
  - Two-factor authentication

### ⚙️ Administration
- **Admin Panel** 🚧 *Coming June 2025*
  - System configuration
  - User management
  - Security monitoring

## 🎨 Design System

### Color Scheme
- **Primary Colors**: Blue gradient (`blue-500` to `indigo-700`)
- **Status Colors**: Green (success), Orange (warning), Red (error)
- **Neutral Colors**: Slate/Gray scale for backgrounds and text
- **Theme Support**: Full dark/light mode with automatic system detection

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body Text**: Clean, readable font stack
- **Monospace**: Used for timestamps and data display

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent hover states and transitions
- **Forms**: Clean input styling with focus states
- **Navigation**: Intuitive layout with clear hierarchy

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Setup

The application uses Next.js configuration and requires no additional environment variables for basic functionality.

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Streamlined interface with essential features

## 🔒 Security Features

- Context-based state management
- Type-safe development with TypeScript
- Input validation and sanitization
- Secure routing and navigation

## 🚧 Development Roadmap

### Phase 1 (Q1 2025)
- ✅ Dashboard and core UI
- ✅ Session creation system
- 🚧 Authentication system
- 🚧 Personnel management

### Phase 2 (Q2 2025)
- 🚧 Analytics dashboard
- 🚧 Weekly rankings
- 🚧 Custom reports
- 🚧 User profiles

### Phase 3 (Q3 2025)
- 🚧 Overall rankings
- 🚧 Advanced analytics
- 🚧 Admin panel
- 🚧 API integrations

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, feature requests, or bug reports, please open an issue in the repository or contact the development team.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

---

**Target Practice** - Making shooting range management simple, safe, and efficient.