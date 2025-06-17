'use client';

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Trophy, 
  User, 
  Settings, 
  BarChart3, 
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
  Moon,
  Shield,
  ChevronLeft
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
        icon: <TrendingUp className="w-4 h-4" />,
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

const NavItem = ({ item, isActive, isExpanded, onToggle, depth = 0, darkMode, isCollapsed }: {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  depth?: number;
  darkMode: boolean;
  isCollapsed: boolean;
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = depth === 0 ? (isCollapsed ? 'pl-3' : 'pl-4') : (isCollapsed ? 'pl-6' : 'pl-8');

  const baseClasses = `w-full flex items-center ${hasChildren && !isCollapsed ? 'justify-between' : ''} ${paddingLeft} ${isCollapsed ? 'pr-3 py-3' : 'pr-4 py-3'} transition-all duration-200 group rounded-lg mx-2`;
  
  const activeClasses = darkMode 
    ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-r-4 border-blue-400 text-blue-100' 
    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-r-4 border-blue-500 text-blue-900 shadow-sm';
    
  const inactiveClasses = darkMode
    ? 'text-gray-300 hover:bg-slate-700/50 hover:text-blue-100'
    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-900';

  const iconActiveClasses = darkMode ? 'text-blue-400' : 'text-blue-600';
  const iconInactiveClasses = darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-600';

  // Don't render children when sidebar is collapsed
  if (isCollapsed && depth > 0) return null;

  return (
    <div className="mb-1">
      {hasChildren ? (
        <button
          onClick={() => !isCollapsed && onToggle(item.id)}
          className={`${baseClasses} text-left ${isActive ? activeClasses : inactiveClasses} relative group`}
          title={isCollapsed ? item.label : undefined}
        >
          <div className="flex items-center space-x-3">
            <span className={`transition-colors ${isActive ? iconActiveClasses : iconInactiveClasses}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <>
                <span className="font-medium text-sm">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </div>
          {!isCollapsed && (
            <ChevronRight 
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          )}
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              {item.label}
              {item.badge && (
                <span className="ml-2 px-1 py-0.5 text-xs font-bold bg-red-500 text-white rounded">
                  {item.badge}
                </span>
              )}
            </div>
          )}
        </button>
      ) : (
        <Link
          href={item.href}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} relative group`}
          title={isCollapsed ? item.label : undefined}
        >
          <div className="flex items-center space-x-3">
            <span className={`transition-colors ${isActive ? iconActiveClasses : iconInactiveClasses}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <>
                <span className="font-medium text-sm">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </div>
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              {item.label}
              {item.badge && (
                <span className="ml-2 px-1 py-0.5 text-xs font-bold bg-red-500 text-white rounded">
                  {item.badge}
                </span>
              )}
            </div>
          )}
        </Link>
      )}
      
      {hasChildren && isExpanded && !isCollapsed && (
        <div className={`${darkMode ? 'bg-slate-800/30' : 'bg-gray-50/50'} rounded-lg mx-2 mt-1 mb-2 py-2`}>
          {item.children?.map(child => (
            <NavItem
              key={child.id}
              item={child}
              isActive={false}
              isExpanded={false}
              onToggle={onToggle}
              depth={depth + 1}
              darkMode={darkMode}
              isCollapsed={isCollapsed}
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['shooting']));

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && mobileMenuOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, mobileMenuOpen]);

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

  const sidebarBg = darkMode ? 'bg-slate-800' : 'bg-white';
  const sidebarBorder = darkMode ? 'border-slate-700' : 'border-gray-200';
  const mainBg = darkMode ? 'bg-slate-900' : 'bg-gray-50';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  // Desktop sidebar width logic
  const desktopSidebarWidth = sidebarCollapsed ? 'w-16' : 'w-72';
  
  return (
    <div className={`flex h-screen ${mainBg} ${textPrimary}`}>
      {/* Mobile Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`${
          isMobile ? 
            `w-72 fixed h-full z-50 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}` : 
            `${desktopSidebarWidth} relative`
        } transition-all duration-300 ${sidebarBg} border-r ${sidebarBorder} flex flex-col shadow-lg`}
      >
        {/* Header */}
        <div className={`${sidebarCollapsed && !isMobile ? 'p-3' : 'p-4'} border-b ${sidebarBorder} flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <Target className="w-5 h-5 text-white" />
              </div>
              {(!sidebarCollapsed || isMobile) && (
                <div>
                  <h1 className={`text-lg font-bold ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>RANGE OPS</h1>
                  <p className={`text-xs ${textSecondary} font-mono`}>v2.1.0</p>
                </div>
              )}
            </div>
            {isMobile ? (
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Theme Toggle - Compact */}
        {(!sidebarCollapsed || isMobile) && (
          <div className="p-3 flex-shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-colors text-sm ${
                darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="font-medium">
                {darkMode ? 'Light' : 'Dark'}
              </span>
            </button>
          </div>
        )}

        {/* Collapsed Theme Toggle */}
        {sidebarCollapsed && !isMobile && (
          <div className="p-2 flex-shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center justify-center py-2 px-2 rounded-lg transition-colors ${
                darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'
              } group relative`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </div>
            </button>
          </div>
        )}

        {/* User Info - Compact */}
        {(!sidebarCollapsed || isMobile) && (
          <div className={`px-3 pb-3 border-b ${sidebarBorder} flex-shrink-0`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>SGT. DEMO</p>
                <p className={`text-xs ${textSecondary}`}>Range Officer</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-gray-100'} rounded-lg p-2`}>
                <p className={`text-xs ${textSecondary} mb-1`}>RANK</p>
                <p className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>#12</p>
              </div>
              <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-gray-100'} rounded-lg p-2`}>
                <p className={`text-xs ${textSecondary} mb-1`}>SCORE</p>
                <p className="text-sm font-bold text-green-500">847</p>
              </div>
              <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-gray-100'} rounded-lg p-2`}>
                <p className={`text-xs ${textSecondary} mb-1`}>ACC</p>
                <p className="text-sm font-bold text-purple-500">94%</p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed User Info */}
        {sidebarCollapsed && !isMobile && (
          <div className={`p-2 border-b ${sidebarBorder} flex-shrink-0`}>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md mx-auto group relative">
              <Shield className="w-5 h-5 text-white" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                SGT. DEMO USER<br/>
                <span className="text-xs text-gray-300">Rank #12 • Score 847</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation - Takes up most space (about 70%) */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map(item => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                isExpanded={expandedItems.has(item.id)}
                onToggle={toggleExpanded}
                darkMode={darkMode}
                isCollapsed={sidebarCollapsed && !isMobile}
              />
            ))}
          </div>
        </nav>

        {/* Settings - Fixed at bottom */}
        <div className={`p-3 border-t ${sidebarBorder} flex-shrink-0`}>
          <Link 
            href="/settings"
            className={`w-full flex items-center ${sidebarCollapsed && !isMobile ? 'justify-center' : 'justify-center space-x-3'} py-3 px-3 ${textSecondary} ${darkMode ? 'hover:text-blue-400 hover:bg-slate-700' : 'hover:text-blue-600 hover:bg-gray-100'} transition-colors rounded-lg group relative`}
            title={sidebarCollapsed && !isMobile ? 'System Config' : undefined}
          >
            <Settings className="w-5 h-5" />
            {(!sidebarCollapsed || isMobile) && (
              <span className="font-medium text-sm">System Config</span>
            )}
            {/* Tooltip for collapsed state */}
            {sidebarCollapsed && !isMobile && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                System Config
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile menu button */}
        {isMobile && (
          <div className="p-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-3 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'} transition-colors shadow-lg border ${sidebarBorder}`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}