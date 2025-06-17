'use client';

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Trophy, 
  User, 
  Settings, 
  BarChart3, 
  Clock, 
  Shield, 
  Menu, 
  X, 
  Home,
  Users,
  FileText,
  Crosshair,
  Medal,
  TrendingUp,
  ChevronRight,
  Zap,
  Sun,
  Moon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Command Center',
    icon: <Home className="w-5 h-5" />,
    href: '/'
  },
  {
    id: 'shooting',
    label: 'Live Fire',
    icon: <Target className="w-5 h-5" />,
    href: '/shooting',
    badge: 'ACTIVE',
    children: [
      {
        id: 'new-session',
        label: 'New Session',
        icon: <Crosshair className="w-4 h-4" />,
        href: '/shooting/new'
      },
      {
        id: 'active-sessions',
        label: 'Active Sessions',
        icon: <Zap className="w-4 h-4" />,
        href: '/shooting/active'
      }
    ]
  },
  {
    id: 'rankings',
    label: 'Leaderboard',
    icon: <Trophy className="w-5 h-5" />,
    href: '/rankings',
    children: [
      {
        id: 'overall',
        label: 'Overall Rankings',
        icon: <Medal className="w-4 h-4" />,
        href: '/rankings/overall'
      },
      {
        id: 'weekly',
        label: 'Weekly Challenge',
        icon: <Clock className="w-4 h-4" />,
        href: '/rankings/weekly'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Intel & Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/analytics',
    children: [
      {
        id: 'performance',
        label: 'Performance',
        icon: <TrendingUp className="w-4 h-4" />,
        href: '/analytics/performance'
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: <FileText className="w-4 h-4" />,
        href: '/analytics/reports'
      }
    ]
  },
  {
    id: 'personnel',
    label: 'Personnel',
    icon: <Users className="w-5 h-5" />,
    href: '/personnel'
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="w-5 h-5" />,
    href: '/profile'
  }
];

const NavItem = ({ item, isActive, isExpanded, onToggle, depth = 0, darkMode, isMobile }: {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  depth?: number;
  darkMode: boolean;
  isMobile: boolean;
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = depth === 0 ? 'pl-4' : 'pl-8';

  const baseClasses = `w-full flex items-center ${hasChildren ? 'justify-between' : ''} ${paddingLeft} pr-4 py-3 transition-all duration-200 group rounded-lg ${isMobile ? 'mx-2' : 'mx-1'}`;
  
  const activeClasses = darkMode 
    ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-r-2 border-blue-400 text-blue-100' 
    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-r-2 border-blue-500 text-blue-900 shadow-sm';
    
  const inactiveClasses = darkMode
    ? 'text-gray-300 hover:bg-slate-700/50 hover:text-blue-100'
    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-900';

  const iconActiveClasses = darkMode ? 'text-blue-400' : 'text-blue-600';
  const iconInactiveClasses = darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600';

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={() => onToggle(item.id)}
          className={`${baseClasses} text-left ${isActive ? activeClasses : inactiveClasses}`}
        >
          <div className="flex items-center space-x-3">
            <span className={`transition-colors ${isActive ? iconActiveClasses : iconInactiveClasses}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                {item.badge}
              </span>
            )}
          </div>
          <ChevronRight 
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <div className="flex items-center space-x-3">
            <span className={`transition-colors ${isActive ? iconActiveClasses : iconInactiveClasses}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                {item.badge}
              </span>
            )}
          </div>
        </Link>
      )}
      
      {hasChildren && isExpanded && (
        <div className={`${darkMode ? 'bg-slate-800/30' : 'bg-gray-50/50'} rounded-lg ${isMobile ? 'mx-2' : 'mx-1'} mt-1 mb-1`}>
          {item.children?.map(child => (
            <NavItem
              key={child.id}
              item={child}
              isActive={false}
              isExpanded={false}
              onToggle={onToggle}
              depth={depth + 1}
              darkMode={darkMode}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['shooting']));

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  const getActiveItem = () => {
    if (pathname === '/') return 'dashboard';
    if (pathname.startsWith('/shooting')) return 'shooting';
    if (pathname.startsWith('/rankings')) return 'rankings';
    if (pathname.startsWith('/analytics')) return 'analytics';
    if (pathname.startsWith('/personnel')) return 'personnel';
    if (pathname.startsWith('/profile')) return 'profile';
    return '';
  };

  const activeItem = getActiveItem();

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const sidebarWidth = isMobile ? 'w-80' : (sidebarOpen ? 'w-64' : 'w-16');
  const sidebarBg = darkMode ? 'bg-slate-800' : 'bg-white';
  const sidebarBorder = darkMode ? 'border-slate-700' : 'border-gray-200';
  const mainBg = darkMode ? 'bg-slate-900' : 'bg-gray-50';
  const headerBg = darkMode ? 'bg-slate-800' : 'bg-white';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`flex h-screen ${mainBg} ${textPrimary}`}>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`${sidebarWidth} transition-all duration-300 ${sidebarBg} border-r ${sidebarBorder} flex flex-col shadow-lg z-50 ${
          isMobile ? 'fixed h-full' : 'relative'
        } ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${sidebarBorder}`}>
          <div className="flex items-center justify-between">
            {(sidebarOpen || !isMobile) && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className={`text-lg font-bold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>RANGE OPS</h1>
                  <p className={`text-xs ${textSecondary} font-mono`}>v2.1.0</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              {(sidebarOpen || isMobile) ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Theme Toggle */}
        {(sidebarOpen || !isMobile) && (
          <div className="p-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-colors ${
                darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>
        )}

        {/* User Info */}
        {(sidebarOpen || !isMobile) && (
          <div className={`p-4 border-b ${sidebarBorder}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-semibold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>SGT. DEMO USER</p>
                <p className={`text-xs ${textSecondary}`}>Range Officer</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-gray-100'} rounded-lg p-2`}>
                <p className={`text-xs ${textSecondary}`}>RANK</p>
                <p className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>#12</p>
              </div>
              <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-gray-100'} rounded-lg p-2`}>
                <p className={`text-xs ${textSecondary}`}>SCORE</p>
                <p className="text-sm font-bold text-green-500">847</p>
              </div>
              <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-gray-100'} rounded-lg p-2`}>
                <p className={`text-xs ${textSecondary}`}>ACC</p>
                <p className="text-sm font-bold text-purple-500">94%</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {navigationItems.map(item => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeItem === item.id}
              isExpanded={expandedItems.has(item.id)}
              onToggle={toggleExpanded}
              darkMode={darkMode}
              isMobile={isMobile}
            />
          ))}
        </nav>

        {/* Status Bar */}
        {(sidebarOpen || !isMobile) && (
          <div className={`p-4 border-t ${sidebarBorder}`}>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className={textSecondary}>Range Status</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-500 font-semibold">OPERATIONAL</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={textSecondary}>Active Sessions</span>
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold`}>3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={textSecondary}>System Load</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-16 h-1 ${darkMode ? 'bg-slate-600' : 'bg-gray-300'} rounded-full overflow-hidden`}>
                    <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                  </div>
                  <span className="text-yellow-500 text-xs">75%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className={`p-4 border-t ${sidebarBorder}`}>
          <Link 
            href="/settings"
            className={`w-full flex items-center ${(sidebarOpen || !isMobile) ? 'justify-start space-x-3 px-0' : 'justify-center'} py-2 ${textSecondary} ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
          >
            <Settings className="w-5 h-5" />
            {(sidebarOpen || !isMobile) && <span>System Config</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className={`${headerBg} border-b ${sidebarBorder} px-6 py-4 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className={`md:hidden p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                  {activeItem === 'dashboard' ? 'Command Center' :
                   activeItem === 'shooting' ? 'Live Fire Operations' :
                   activeItem === 'rankings' ? 'Leaderboard' :
                   activeItem === 'analytics' ? 'Intel & Analytics' :
                   activeItem === 'personnel' ? 'Personnel Management' :
                   activeItem === 'profile' ? 'User Profile' : 'Range Operations'}
                </h2>
                <p className={`text-sm ${textSecondary}`}>Shooting Range Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className={`w-4 h-4 ${textSecondary}`} />
                <span className={`${textPrimary} font-mono`}>
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">D</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`flex-1 overflow-auto ${mainBg}`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}