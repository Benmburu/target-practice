'use client';

import React, { useState } from 'react';
import { Play, Square, RotateCcw, Target, Trophy, TrendingUp } from 'lucide-react';

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

// Simplified target component for demo
const SimpleTarget = ({ shots, onShotClick, size = 300 }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate score based on distance from center
    const centerX = size / 2;
    const centerY = size / 2;
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    const maxDistance = size / 2;
    const score = Math.max(10 - Math.floor((distance / maxDistance) * 10), 0);
    
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
        className="relative bg-white border-4 border-gray-800 rounded-full cursor-crosshair"
        style={{ width: size, height: size }}
        onClick={handleClick}
      >
        {/* Target rings */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-gray-400 rounded-full"
            style={{
              width: `${100 - (i * 10)}%`,
              height: `${100 - (i * 10)}%`,
              left: `${(i * 10) / 2}%`,
              top: `${(i * 10) / 2}%`,
              backgroundColor: i < 2 ? '#FFD700' : 'transparent'
            }}
          />
        ))}
        
        {/* Center crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-0.5 bg-black absolute"></div>
          <div className="h-8 w-0.5 bg-black absolute"></div>
        </div>
        
        {/* Shot markers */}
        {shots.map((shot, index) => (
          <div
            key={index}
            className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1.5 -translate-y-1.5 border-2 border-white"
            style={{
              left: shot.x,
              top: shot.y
            }}
            title={`Shot ${index + 1}: ${shot.score} points`}
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-600">Click on target to record shots</p>
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
    const goodShots = newShots.filter(s => s.score >= 7).length;
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
      const goodShots = newShots.filter(s => s.score >= 7).length;
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shooting Range Dashboard</h1>
          <p className="text-gray-600">Track your shooting sessions and improve your accuracy</p>
        </div>

        {/* Session Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Session Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  session?.status === 'active' ? 'bg-green-100 text-green-800' :
                  session?.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {session?.status || 'Not Started'}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {!session || session.status === 'completed' ? (
                <button
                  onClick={startSession}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Session</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={removeLastShot}
                    disabled={!session.shots.length}
                    className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Undo Last</span>
                  </button>
                  <button
                    onClick={endSession}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
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
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Target</h2>
            <div className="flex justify-center">
              <SimpleTarget 
                shots={session?.shots || []} 
                onShotClick={session?.status === 'active' ? addShot : () => {}}
                size={400}
              />
            </div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6">
            {/* Current Session Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Session Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Shots:</span>
                  <span className="font-semibold">{stats.totalShots}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Score:</span>
                  <span className="font-semibold">{stats.totalScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Score:</span>
                  <span className="font-semibold">{stats.averageScore.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Shot:</span>
                  <span className="font-semibold">{stats.bestShot?.score || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-semibold">{stats.accuracy.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Recent Shots */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Shots</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {session?.shots.slice(-10).reverse().map((shot, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-600">
                      Shot {session.shots.length - index}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        shot.score >= 9 ? 'bg-green-100 text-green-800' :
                        shot.score >= 7 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {shot.score}
                      </span>
                    </div>
                  </div>
                ))}
                {(!session || session.shots.length === 0) && (
                  <p className="text-sm text-gray-500">No shots recorded yet</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 text-left p-3 rounded-md hover:bg-gray-50 transition-colors">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span>View Rankings</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-left p-3 rounded-md hover:bg-gray-50 transition-colors">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>Progress Analytics</span>
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