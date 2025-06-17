'use client';

import React, { useState } from 'react';
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
  Zap
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

const NavItem = ({ item, isActive, isExpanded, onToggle, depth = 0 }: {
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  depth?: number;
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = depth === 0 ? 'pl-4' : 'pl-8';

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={() => onToggle(item.id)}
          className={`w-full flex items-center justify-between ${paddingLeft} pr-4 py-3 text-left transition-all duration-200 group ${
            isActive 
              ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-r-2 border-amber-400 text-amber-100' 
              : 'text-gray-300 hover:bg-slate-700/50 hover:text-amber-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className={`transition-colors ${isActive ? 'text-amber-400' : 'text-gray-400 group-hover:text-amber-400'}`}>
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
          className={`w-full flex items-center ${paddingLeft} pr-4 py-3 transition-all duration-200 group ${
            isActive 
              ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-r-2 border-amber-400 text-amber-100' 
              : 'text-gray-300 hover:bg-slate-700/50 hover:text-amber-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span className={`transition-colors ${isActive ? 'text-amber-400' : 'text-gray-400 group-hover:text-amber-400'}`}>
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
        <div className="bg-slate-800/30">
          {item.children?.map(child => (
            <NavItem
              key={child.id}
              item={child}
              isActive={false} // You'd implement proper active state logic here
              isExpanded={false}
              onToggle={onToggle}
              depth={depth + 1}
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['shooting']));

  // Determine active item based on current path
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

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-800 border-r border-slate-700 flex flex-col shadow-2xl`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-amber-100">RANGE OPS</h1>
                  <p className="text-xs text-gray-400 font-mono">v2.1.0</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-amber-100">SGT. DEMO USER</p>
                <p className="text-xs text-gray-400">Range Officer</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-700/50 rounded-lg p-2">
                <p className="text-xs text-gray-400">RANK</p>
                <p className="text-sm font-bold text-amber-400">#12</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-2">
                <p className="text-xs text-gray-400">SCORE</p>
                <p className="text-sm font-bold text-green-400">847</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-2">
                <p className="text-xs text-gray-400">ACC</p>
                <p className="text-sm font-bold text-blue-400">94%</p>
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
            />
          ))}
        </nav>

        {/* Status Bar */}
        {sidebarOpen && (
          <div className="p-4 border-t border-slate-700">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Range Status</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">OPERATIONAL</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Active Sessions</span>
                <span className="text-amber-400 font-semibold">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">System Load</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1 bg-slate-600 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                  </div>
                  <span className="text-yellow-400 text-xs">75%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="p-4 border-t border-slate-700">
          <Link 
            href="/settings"
            className={`w-full flex items-center ${sidebarOpen ? 'justify-start space-x-3 px-0' : 'justify-center'} py-2 text-gray-400 hover:text-amber-400 transition-colors`}
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span>System Config</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-amber-100">
                {activeItem === 'dashboard' ? 'Command Center' :
                 activeItem === 'shooting' ? 'Live Fire Operations' :
                 activeItem === 'rankings' ? 'Leaderboard' :
                 activeItem === 'analytics' ? 'Intel & Analytics' :
                 activeItem === 'personnel' ? 'Personnel Management' :
                 activeItem === 'profile' ? 'User Profile' : 'Range Operations'}
              </h2>
              <p className="text-sm text-gray-400">Shooting Range Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 font-mono">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">D</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-900">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}