// app/page.tsx
import { Target, Users, Trophy, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-6 border border-slate-600">
        <h1 className="text-2xl font-bold text-amber-100 mb-2">Welcome to Range Operations</h1>
        <p className="text-gray-300">Monitor and manage your shooting range activities in real-time.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Sessions</p>
              <p className="text-2xl font-bold text-amber-400">3</p>
            </div>
            <Target className="w-8 h-8 text-amber-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Shooters</p>
              <p className="text-2xl font-bold text-green-400">127</p>
            </div>
            <Users className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Today's High Score</p>
              <p className="text-2xl font-bold text-blue-400">94</p>
            </div>
            <Trophy className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Range Efficiency</p>
              <p className="text-2xl font-bold text-purple-400">87%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-amber-100 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-semibold py-3 px-4 rounded-md hover:from-amber-600 hover:to-orange-600 transition-colors">
              Start New Session
            </button>
            <button className="w-full bg-slate-700 text-gray-300 font-semibold py-3 px-4 rounded-md hover:bg-slate-600 transition-colors">
              View Rankings
            </button>
            <button className="w-full bg-slate-700 text-gray-300 font-semibold py-3 px-4 rounded-md hover:bg-slate-600 transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-amber-100 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-gray-300">Session #127 completed</span>
              <span className="text-sm text-gray-400">2 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-gray-300">New high score: 96 points</span>
              <span className="text-sm text-gray-400">15 min ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-gray-300">Shooter registration: J. Smith</span>
              <span className="text-sm text-gray-400">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}