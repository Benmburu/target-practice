'use client';

import React, { useState } from 'react';
import { Play, Square, RotateCcw, Target, Trophy, TrendingUp, Settings, Clock, Calendar } from 'lucide-react';
import { useDarkMode } from '@/contexts/DarkModeContext';

// Mock types for demo (replace with your actual types)
interface Shot {
  id?: string;
  x: number;
  y: number;
  timestamp: Date;
  score: number;
  sessionId?: string;
  shooterId?: string;
}

interface SessionStats {
  totalShots: number;
  totalScore: number;
  averageScore: number;
  bestShot: Shot | null;
  accuracy: number;
}

interface ShootingSession {
  id: string;
  shooterId: string;
  startTime: Date;
  endTime?: Date;
  targetType: string;
  shots: Shot[];
  totalScore: number;
  averageScore: number;
  status: 'active' | 'completed' | 'paused';
}

interface TargetConfig {
  rings: number;
  size: number;
  maxScore: number;
}

// Enhanced target component with alternating red and white rings
const EnhancedTarget = ({ shots, onShotClick, config, disabled = false }) => {
  const { darkMode } = useDarkMode();
  const isDarkMode = darkMode;
  const { rings, size, maxScore } = config;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate score based on distance from center
    const centerX = size / 2;
    const centerY = size / 2;
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    const maxDistance = size / 2;
    
    // Score based on which ring the shot lands in
    let score = 0;
    for (let i = 0; i < rings; i++) {
      const ringRadius = ((i + 1) / rings) * maxDistance;
      if (distance <= ringRadius) {
        score = maxScore - i;
        break;
      }
    }
    
    const shot: Shot = {
      x,
      y,
      timestamp: new Date(),
      score
    };
    
    onShotClick(shot);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`relative border-4 rounded-full transition-all duration-200 ${
          disabled 
            ? 'cursor-not-allowed opacity-60' 
            : 'cursor-crosshair hover:shadow-lg'
        } ${
          isDarkMode 
            ? 'border-slate-600 shadow-slate-900/50' 
            : 'border-gray-800 shadow-gray-900/20'
        } shadow-xl`}
        style={{ width: size, height: size }}
        onClick={handleClick}
      >
        {/* Target rings - alternating red and white */}
        {[...Array(rings)].map((_, i) => {
          const ringSize = 100 - ((i * 100) / rings);
          const isRed = i % 2 === 0;
          
          return (
            <div
              key={i}
              className={`absolute border-2 rounded-full ${
                isDarkMode 
                  ? 'border-slate-500/30' 
                  : 'border-gray-400/50'
              }`}
              style={{
                width: `${ringSize}%`,
                height: `${ringSize}%`,
                left: `${(100 - ringSize) / 2}%`,
                top: `${(100 - ringSize) / 2}%`,
                backgroundColor: isRed ? '#DC2626' : '#FFFFFF',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          );
        })}
        
        {/* Center bullseye */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-black rounded-full border-2 border-white shadow-lg"></div>
        </div>
        
        {/* Center crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-0.5 bg-black absolute opacity-50"></div>
          <div className="h-12 w-0.5 bg-black absolute opacity-50"></div>
        </div>
        
        {/* Shot markers */}
        {shots.map((shot, index) => (
          <div
            key={index}
            className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1 border-2 border-white shadow-lg z-10 animate-pulse"
            style={{
              left: shot.x,
              top: shot.y
            }}
            title={`Shot ${index + 1}: ${shot.score} points`}
          />
        ))}
        
        {/* Score indicator overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(rings)].map((_, i) => {
            const ringSize = 100 - ((i * 100) / rings);
            const score = maxScore - i;
            
            return (
              <div
                key={i}
                className="absolute flex items-center justify-start"
                style={{
                  width: `${ringSize}%`,
                  height: `${ringSize}%`,
                  left: `${(100 - ringSize) / 2}%`,
                  top: `${(100 - ringSize) / 2}%`,
                }}
              >
                <span className={`text-xs font-bold ml-2 px-1 py-0.5 rounded ${
                  i % 2 === 0 
                    ? 'text-white bg-black/20' 
                    : 'text-black bg-white/50'
                }`}>
                  {score}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <p className={`mt-4 text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {disabled ? 'Start a session to begin shooting' : 'Click on target to record shots'}
      </p>
    </div>
  );
};

const SessionDashboard = () => {
  // Mock session state
  const [session, setSession] = useState<ShootingSession | null>(null);
  const [stats, setStats] = useState<SessionStats>({
    totalShots: 0,
    totalScore: 0,
    averageScore: 0,
    bestShot: null,
    accuracy: 0
  });
  const [targetConfig, setTargetConfig] = useState<TargetConfig>({
    rings: 10,
    size: 400,
    maxScore: 10
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { darkMode } = useDarkMode();
  const isDarkMode = darkMode;

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startSession = () => {
    const newSession: ShootingSession = {
      id: `session_${Date.now()}`,
      shooterId: 'demo_shooter',
      startTime: new Date(),
      targetType: 'bullseye',
      shots: [],
      totalScore: 0,
      averageScore: 0,
      status: 'active'
    };
    setSession(newSession);
  };

  const endSession = () => {
    if (!session) return;
    setSession({
      ...session,
      endTime: new Date(),
      status: 'completed'
    });
  };

  const addShot = (shot: Shot) => {
    if (!session) return;
    
    const newShots = [...session.shots, shot];
    const totalScore = newShots.reduce((sum, s) => sum + s.score, 0);
    const averageScore = totalScore / newShots.length;
    
    const updatedSession = {
      ...session,
      shots: newShots,
      totalScore,
      averageScore
    };
    
    setSession(updatedSession);
    
    // Update stats
    const bestShot = newShots.reduce((best, current) => 
      current.score > (best?.score || 0) ? current : best, newShots[0]);
    const goodShots = newShots.filter(s => s.score >= Math.ceil(targetConfig.maxScore * 0.7)).length;
    const accuracy = (goodShots / newShots.length) * 100;
    
    setStats({
      totalShots: newShots.length,
      totalScore,
      averageScore,
      bestShot,
      accuracy
    });
  };

  const removeLastShot = () => {
    if (!session || session.shots.length === 0) return;
    
    const newShots = session.shots.slice(0, -1);
    const totalScore = newShots.reduce((sum, s) => sum + s.score, 0);
    const averageScore = newShots.length > 0 ? totalScore / newShots.length : 0;
    
    setSession({
      ...session,
      shots: newShots,
      totalScore,
      averageScore
    });
    
    // Update stats
    if (newShots.length === 0) {
      setStats({
        totalShots: 0,
        totalScore: 0,
        averageScore: 0,
        bestShot: null,
        accuracy: 0
      });
    } else {
      const bestShot = newShots.reduce((best, current) => 
        current.score > (best?.score || 0) ? current : best, newShots[0]);
      const goodShots = newShots.filter(s => s.score >= Math.ceil(targetConfig.maxScore * 0.7)).length;
      const accuracy = (goodShots / newShots.length) * 100;
      
      setStats({
        totalShots: newShots.length,
        totalScore,
        averageScore,
        bestShot,
        accuracy
      });
    }
  };

  const updateTargetConfig = (newConfig: Partial<TargetConfig>) => {
    setTargetConfig(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    } p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`${
          isDarkMode 
            ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-700 border-blue-200'
        } rounded-xl p-8 border shadow-lg mb-8`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Shooting Range Session
              </h1>
              <p className="text-blue-100 text-lg mb-4 md:mb-0">
                Track your shooting accuracy and improve your skills
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

        {/* Session Controls */}
        <div className={`${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        } rounded-xl p-6 mb-6 border shadow-sm`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Session Status:
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  session?.status === 'active' 
                    ? 'bg-green-100 text-green-800' :
                  session?.status === 'completed' 
                    ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {session?.status || 'Not Started'}
                </span>
              </div>
              
              {/* Target Configuration */}
              <div className="flex items-center space-x-4">
                <Settings className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <div className="flex items-center space-x-2">
                  <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Rings:
                  </label>
                  <select
                    value={targetConfig.rings}
                    onChange={(e) => updateTargetConfig({ rings: parseInt(e.target.value), maxScore: parseInt(e.target.value) })}
                    className={`px-2 py-1 rounded border text-sm ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    disabled={session?.status === 'active'}
                  >
                    <option value={5}>5</option>
                    <option value={8}>8</option>
                    <option value={10}>10</option>
                    <option value={12}>12</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Size:
                  </label>
                  <select
                    value={targetConfig.size}
                    onChange={(e) => updateTargetConfig({ size: parseInt(e.target.value) })}
                    className={`px-2 py-1 rounded border text-sm ${
                      isDarkMode 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    disabled={session?.status === 'active'}
                  >
                    <option value={300}>Small</option>
                    <option value={400}>Medium</option>
                    <option value={500}>Large</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {!session || session.status === 'completed' ? (
                <button
                  onClick={startSession}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Session</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={removeLastShot}
                    disabled={!session.shots.length}
                    className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Undo Last</span>
                  </button>
                  <button
                    onClick={endSession}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Square className="w-4 h-4" />
                    <span>End Session</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Target Area */}
          <div className="lg:col-span-2">
            <div className={`${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
            } rounded-xl p-6 border shadow-sm`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Target Practice
                </h2>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {targetConfig.rings} rings • Max score: {targetConfig.maxScore}
                </div>
              </div>
              <div className="flex justify-center">
                <EnhancedTarget 
                  shots={session?.shots || []} 
                  onShotClick={session?.status === 'active' ? addShot : () => {}}
                  config={targetConfig}
                  disabled={session?.status !== 'active'}
                />
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6">
            {/* Current Session Stats */}
            <div className={`${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
            } rounded-xl p-6 border shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Session Stats
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Total Shots', value: stats.totalShots, color: 'blue' },
                  { label: 'Total Score', value: stats.totalScore, color: 'green' },
                  { label: 'Average Score', value: stats.averageScore.toFixed(1), color: 'purple' },
                  { label: 'Best Shot', value: stats.bestShot?.score || 0, color: 'orange' },
                  { label: 'Accuracy', value: `${stats.accuracy.toFixed(1)}%`, color: 'yellow' }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-opacity-10 border-gray-500 last:border-b-0">
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {stat.label}:
                    </span>
                    <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Shots */}
            <div className={`${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
            } rounded-xl p-6 border shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Shots
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {session?.shots.slice(-10).reverse().map((shot, index) => (
                  <div key={index} className={`flex justify-between items-center py-3 px-3 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                  }`}>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Shot {session.shots.length - index}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        shot.score >= Math.ceil(targetConfig.maxScore * 0.9) 
                          ? 'bg-green-100 text-green-800' :
                        shot.score >= Math.ceil(targetConfig.maxScore * 0.7) 
                          ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {shot.score}
                      </span>
                    </div>
                  </div>
                ))}
                {(!session || session.shots.length === 0) && (
                  <p className={`text-sm text-center py-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    No shots recorded yet
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
            } rounded-xl p-6 border shadow-sm`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className={`w-full flex items-center space-x-3 text-left p-3 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                }`}>
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    View Rankings
                  </span>
                </button>
                <button className={`w-full flex items-center space-x-3 text-left p-3 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'
                }`}>
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    Progress Analytics
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDashboard;