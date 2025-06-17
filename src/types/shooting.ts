export interface Shot {
  id?: string;
  x: number;
  y: number;
  timestamp: Date;
  score: number;
  sessionId?: string;
  shooterId?: string;
}

export interface ShootingSession {
  id: string;
  shooterId: string;
  startTime: Date;
  endTime?: Date;
  targetType: TargetType;
  shots: Shot[];
  totalScore: number;
  averageScore: number;
  status: 'active' | 'completed' | 'paused';
}

export interface Shooter {
  id: string;
  name: string;
  email: string;
  rank?: string;
  totalSessions: number;
  bestScore: number;
  averageScore: number;
  registrationDate: Date;
}

export interface TargetConfig {
  size: number;
  rings: number;
  scoringSystem: 'traditional' | 'olympic' | 'custom';
  maxScore: number;
}

export type TargetType = 'bullseye' | 'olympic' | 'custom';

export interface SessionStats {
  totalShots: number;
  totalScore: number;
  averageScore: number;
  bestShot: Shot | null;
  accuracy: number; // percentage within certain ring
}