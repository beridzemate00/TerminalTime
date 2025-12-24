// Type definitions for the app

export interface Project {
    id?: number;
    name: string;
    color: string;
    icon: string;
    tags?: string;
    archived: boolean;
    created_at?: string;
}

export interface Session {
    id?: number;
    project_id: number;
    start_time: string;
    end_time?: string;
    duration_seconds: number;
    notes?: string;
    is_pomodoro: boolean;
    created_at?: string;
}

export interface PomodoroSettings {
    id: number;
    work_duration: number;
    short_break: number;
    long_break: number;
    cycles_before_long_break: number;
    sound_enabled: boolean;
    notifications_enabled: boolean;
}

export interface Goal {
    id?: number;
    project_id?: number;
    daily_target_seconds: number;
    created_at?: string;
}

export interface Streak {
    id?: number;
    date: string;
    total_seconds: number;
    goal_met: boolean;
}

export interface DailyStats {
    date: string;
    total_seconds: number;
    sessions_count: number;
}

export interface ProjectStats {
    project_id: number;
    project_name: string;
    total_seconds: number;
    sessions_count: number;
}

export type TimerStatus = 'idle' | 'running' | 'paused';
export type PomodoroPhase = 'work' | 'short_break' | 'long_break';
