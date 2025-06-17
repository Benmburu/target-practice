'use client';

import { useDarkMode } from '@/contexts/DarkModeContext';
import { Clock, Calendar, Rocket, ArrowLeft, Bell, Star, Zap } from 'lucide-react';
import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description?: string;
  expectedDate?: string;
  features?: string[];
  priority?: 'high' | 'medium' | 'low';
  backUrl?: string;
  showNotifyButton?: boolean;
}

export default function ComingSoon({
  title,
  description = "We're working hard to bring you this feature. Stay tuned for updates!",
  expectedDate,
  features = [],
  priority = 'medium',
  backUrl = '/',
  showNotifyButton = true
}: ComingSoonProps) {
  const { darkMode } = useDarkMode();
  const isDarkMode = darkMode;

  const priorityConfig = {
    high: {
      color: 'orange',
      badge: 'High Priority',
      icon: Zap,
      bgGradient: isDarkMode ? 'from-orange-500/20 to-red-500/20' : 'from-orange-50 to-red-50',
      borderColor: isDarkMode ? 'border-orange-500/30' : 'border-orange-200'
    },
    medium: {
      color: 'blue',
      badge: 'In Development',
      icon: Rocket,
      bgGradient: isDarkMode ? 'from-blue-500/20 to-indigo-500/20' : 'from-blue-50 to-indigo-50',
      borderColor: isDarkMode ? 'border-blue-500/30' : 'border-blue-200'
    },
    low: {
      color: 'purple',
      badge: 'Planned',
      icon: Star,
      bgGradient: isDarkMode ? 'from-purple-500/20 to-pink-500/20' : 'from-purple-50 to-pink-50',
      borderColor: isDarkMode ? 'border-purple-500/30' : 'border-purple-200'
    }
  };

  const config = priorityConfig[priority];
  const PriorityIcon = config.icon;

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border' | 'hover') => {
    const colors = {
      blue: {
        bg: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-50',
        text: isDarkMode ? 'text-blue-400' : 'text-blue-600',
        border: isDarkMode ? 'border-blue-500/20' : 'border-blue-200',
        hover: isDarkMode ? 'hover:bg-blue-500/30' : 'hover:bg-blue-100'
      },
      orange: {
        bg: isDarkMode ? 'bg-orange-500/20' : 'bg-orange-50',
        text: isDarkMode ? 'text-orange-400' : 'text-orange-600',
        border: isDarkMode ? 'border-orange-500/20' : 'border-orange-200',
        hover: isDarkMode ? 'hover:bg-orange-500/30' : 'hover:bg-orange-100'
      },
      purple: {
        bg: isDarkMode ? 'bg-purple-500/20' : 'bg-purple-50',
        text: isDarkMode ? 'text-purple-400' : 'text-purple-600',
        border: isDarkMode ? 'border-purple-500/20' : 'border-purple-200',
        hover: isDarkMode ? 'hover:bg-purple-500/30' : 'hover:bg-purple-100'
      }
    };
    return colors[color as keyof typeof colors]?.[type] || '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href={backUrl}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white hover:bg-slate-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Main Coming Soon Card */}
        <div className={`bg-gradient-to-br ${config.bgGradient} ${config.borderColor} rounded-2xl p-8 border shadow-lg mb-8`}>
          <div className="text-center">
            {/* Priority Badge */}
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${getColorClasses(config.color, 'bg')} ${getColorClasses(config.color, 'text')}`}>
              <PriorityIcon className="w-4 h-4" />
              <span>{config.badge}</span>
            </div>

            {/* Main Icon */}
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getColorClasses(config.color, 'bg')} mb-6`}>
              <Rocket className={`w-10 h-10 ${getColorClasses(config.color, 'text')}`} />
            </div>

            {/* Title */}
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h1>

            {/* Description */}
            <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>

            {/* Expected Date */}
            {expectedDate && (
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-white/50'} mb-6`}>
                <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expected: {expectedDate}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Features Preview */}
        {features.length > 0 && (
          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-xl p-6 border shadow-sm mb-8`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              What's Coming
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${getColorClasses(config.color, 'text').replace('text-', 'bg-')}`}></div>
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showNotifyButton && (
            <button className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } hover:scale-105`}>
              <Bell className="w-5 h-5" />
              <span>Notify Me When Ready</span>
            </button>
          )}
          
          <Link
            href={backUrl}
            className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
            } hover:scale-105`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Have questions or suggestions? Contact our development team.
          </p>
        </div>
      </div>
    </div>
  );
}