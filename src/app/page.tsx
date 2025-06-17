// app/page.tsx
'use client';

import { 
  Target, 
  Users, 
  Trophy, 
  TrendingUp, 
  Play, 
  BarChart3, 
  FileText, 
  Activity,
  ArrowRight,
  Clock,
  Star,
  Zap,
  Award,
  Calendar,
  Eye,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { darkMode } = useDarkMode();
  const isDarkMode = darkMode;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   // Check if dark mode is enabled (you might want to sync this with your ClientLayout)
  //   const darkMode = document.documentElement.classList.contains('dark');
  //   setIsDarkMode(darkMode);
  // }, []);

  const stats = [
    {
      title: 'Active Sessions',
      value: '3',
      icon: Target,
      color: 'blue',
      change: '+2 from yesterday',
      trend: 'up'
    },
    {
      title: 'Total Shooters',
      value: '127',
      icon: Users,
      color: 'green',
      change: '+12 this week',
      trend: 'up'
    },
    {
      title: "Today's High Score",
      value: '96',
      icon: Trophy,
      color: 'purple',
      change: 'New record!',
      trend: 'up'
    },
    {
      title: 'Range Efficiency',
      value: '87%',
      icon: TrendingUp,
      color: 'orange',
      change: '+5% this month',
      trend: 'up'
    }
  ];

  const quickActions = [
    {
      title: 'Start New Session',
      description: 'Begin a new shooting session',
      icon: Play,
      href: '/shooting/new',
      color: 'blue',
      primary: true
    },
    {
      title: 'View Rankings',
      description: 'Check current leaderboard',
      icon: Trophy,
      href: '/rankings/overall',
      color: 'purple',
      primary: false
    },
    {
      title: 'Analytics Dashboard',
      description: 'View detailed reports',
      icon: BarChart3,
      href: '/analytics',
      color: 'green',
      primary: false
    },
    {
      title: 'Generate Report',
      description: 'Create performance report',
      icon: FileText,
      href: '/analytics/reports',
      color: 'orange',
      primary: false
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'session',
      title: 'Session #127 completed',
      subtitle: 'Score: 89 points',
      time: '2 min ago',
      icon: Target,
      color: 'blue'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'New high score: 96 points',
      subtitle: 'SGT. Martinez',
      time: '15 min ago',
      icon: Star,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'registration',
      title: 'New shooter registered',
      subtitle: 'J. Smith - Expert Level',
      time: '1 hour ago',
      icon: Users,
      color: 'green'
    },
    {
      id: 4,
      type: 'maintenance',
      title: 'Lane 5 maintenance completed',
      subtitle: 'All systems operational',
      time: '2 hours ago',
      icon: Activity,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border' | 'hover') => {
    const colors = {
      blue: {
        bg: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-50',
        text: isDarkMode ? 'text-blue-400' : 'text-blue-600',
        border: isDarkMode ? 'border-blue-500/20' : 'border-blue-200',
        hover: isDarkMode ? 'hover:bg-blue-500/30' : 'hover:bg-blue-100'
      },
      green: {
        bg: isDarkMode ? 'bg-green-500/20' : 'bg-green-50',
        text: isDarkMode ? 'text-green-400' : 'text-green-600',
        border: isDarkMode ? 'border-green-500/20' : 'border-green-200',
        hover: isDarkMode ? 'hover:bg-green-500/30' : 'hover:bg-green-100'
      },
      purple: {
        bg: isDarkMode ? 'bg-purple-500/20' : 'bg-purple-50',
        text: isDarkMode ? 'text-purple-400' : 'text-purple-600',
        border: isDarkMode ? 'border-purple-500/20' : 'border-purple-200',
        hover: isDarkMode ? 'hover:bg-purple-500/30' : 'hover:bg-purple-100'
      },
      orange: {
        bg: isDarkMode ? 'bg-orange-500/20' : 'bg-orange-50',
        text: isDarkMode ? 'text-orange-400' : 'text-orange-600',
        border: isDarkMode ? 'border-orange-500/20' : 'border-orange-200',
        hover: isDarkMode ? 'hover:bg-orange-500/30' : 'hover:bg-orange-100'
      },
      yellow: {
        bg: isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-50',
        text: isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
        border: isDarkMode ? 'border-yellow-500/20' : 'border-yellow-200',
        hover: isDarkMode ? 'hover:bg-yellow-500/30' : 'hover:bg-yellow-100'
      }
    };
    return colors[color as keyof typeof colors]?.[type] || '';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600' : 'bg-gradient-to-r from-blue-600 to-indigo-700 border-blue-200'} rounded-xl p-8 border shadow-lg`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Range Operations
            </h1>
            <p className="text-blue-100 text-lg mb-4 md:mb-0">
              Monitor and manage your shooting range activities in real-time.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end space-y-2">
            <div className="flex items-center space-x-2 text-white">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-blue-100">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm hover:shadow-md transition-all duration-200 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color, 'bg')}`}>
                  <Icon className={`w-6 h-6 ${getColorClasses(stat.color, 'text')}`} />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === 'up' 
                    ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                    : (isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:scale-105 transition-transform`}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <Zap className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    href={action.href}
                    className={`group p-4 rounded-lg border transition-all duration-200 ${
                      action.primary
                        ? (isDarkMode 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 hover:from-blue-600 hover:to-indigo-700' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 hover:from-blue-600 hover:to-indigo-700')
                        : (isDarkMode 
                          ? 'bg-slate-700 border-slate-600 hover:bg-slate-600' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100')
                    } hover:shadow-md hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          action.primary 
                            ? 'bg-white/20' 
                            : getColorClasses(action.color, 'bg')
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            action.primary 
                              ? 'text-white' 
                              : getColorClasses(action.color, 'text')
                          }`} />
                        </div>
                        <div>
                          <p className={`font-semibold ${
                            action.primary 
                              ? 'text-white' 
                              : (isDarkMode ? 'text-white' : 'text-gray-900')
                          }`}>
                            {action.title}
                          </p>
                          <p className={`text-sm ${
                            action.primary 
                              ? 'text-blue-100' 
                              : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
                          }`}>
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                        action.primary 
                          ? 'text-white' 
                          : (isDarkMode ? 'text-gray-400' : 'text-gray-500')
                      }`} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
            <Link 
              href="/analytics"
              className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} flex items-center space-x-1 transition-colors`}
            >
              <Eye className="w-4 h-4" />
              <span>View All</span>
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${getColorClasses(activity.color, 'bg')} flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${getColorClasses(activity.color, 'text')}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                      {activity.title}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                      {activity.subtitle}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            System Status
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-500 font-semibold">All Systems Operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getColorClasses('blue', 'bg')} mb-3`}>
              <Target className={`w-8 h-8 ${getColorClasses('blue', 'text')}`} />
            </div>
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              Range Lanes
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              8/10 Active
            </p>
            <div className={`w-full h-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
              <div className="w-4/5 h-full bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getColorClasses('green', 'bg')} mb-3`}>
              <Award className={`w-8 h-8 ${getColorClasses('green', 'text')}`} />
            </div>
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              Equipment
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              All Functional
            </p>
            <div className={`w-full h-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
              <div className="w-full h-full bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getColorClasses('purple', 'bg')} mb-3`}>
              <Activity className={`w-8 h-8 ${getColorClasses('purple', 'text')}`} />
            </div>
            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              Network
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              Excellent
            </p>
            <div className={`w-full h-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
              <div className="w-5/6 h-full bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}