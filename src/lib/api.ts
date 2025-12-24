import { invoke } from '@tauri-apps/api/core';
import type {
    Project,
    Session,
    PomodoroSettings,
    Goal,
    DailyStats,
    ProjectStats,
} from '../types';

// ============================================================================
// PROJECT API
// ============================================================================

export const projectApi = {
    create: async (
        name: string,
        color: string,
        icon: string,
        tags?: string
    ): Promise<number> => {
        return await invoke('create_project', { name, color, icon, tags });
    },

    getAll: async (includeArchived: boolean = false): Promise<Project[]> => {
        return await invoke('get_projects', { includeArchived });
    },

    update: async (
        id: number,
        name: string,
        color: string,
        icon: string,
        tags?: string
    ): Promise<void> => {
        return await invoke('update_project', { id, name, color, icon, tags });
    },

    archive: async (id: number, archived: boolean): Promise<void> => {
        return await invoke('archive_project', { id, archived });
    },

    delete: async (id: number): Promise<void> => {
        return await invoke('delete_project', { id });
    },
};

// ============================================================================
// SESSION API
// ============================================================================

export const sessionApi = {
    start: async (projectId: number, isPomodoro: boolean = false): Promise<number> => {
        return await invoke('start_session', { projectId, isPomodoro });
    },

    stop: async (
        sessionId: number,
        durationSeconds: number,
        notes?: string
    ): Promise<void> => {
        return await invoke('stop_session', { sessionId, durationSeconds, notes });
    },

    getActive: async (): Promise<Session | null> => {
        return await invoke('get_active_session');
    },

    getAll: async (
        projectId?: number,
        startDate?: string,
        endDate?: string,
        limit?: number
    ): Promise<Session[]> => {
        return await invoke('get_sessions', { projectId, startDate, endDate, limit });
    },

    update: async (
        sessionId: number,
        durationSeconds: number,
        notes?: string
    ): Promise<void> => {
        return await invoke('update_session', { sessionId, durationSeconds, notes });
    },

    delete: async (sessionId: number): Promise<void> => {
        return await invoke('delete_session', { sessionId });
    },
};

// ============================================================================
// STATISTICS API
// ============================================================================

export const statsApi = {
    getDaily: async (startDate: string, endDate: string): Promise<DailyStats[]> => {
        return await invoke('get_daily_stats', { startDate, endDate });
    },

    getByProject: async (
        startDate: string,
        endDate: string
    ): Promise<ProjectStats[]> => {
        return await invoke('get_project_stats', { startDate, endDate });
    },
};

// ============================================================================
// POMODORO API
// ============================================================================

export const pomodoroApi = {
    getSettings: async (): Promise<PomodoroSettings> => {
        return await invoke('get_pomodoro_settings');
    },

    updateSettings: async (
        workDuration: number,
        shortBreak: number,
        longBreak: number,
        cyclesBeforeLongBreak: number,
        soundEnabled: boolean,
        notificationsEnabled: boolean
    ): Promise<void> => {
        return await invoke('update_pomodoro_settings', {
            workDuration,
            shortBreak,
            longBreak,
            cyclesBeforeLongBreak,
            soundEnabled,
            notificationsEnabled,
        });
    },
};

// ============================================================================
// GOAL & STREAK API
// ============================================================================

export const goalApi = {
    create: async (projectId: number | null, dailyTargetSeconds: number): Promise<number> => {
        return await invoke('create_goal', { projectId, dailyTargetSeconds });
    },

    getAll: async (): Promise<Goal[]> => {
        return await invoke('get_goals');
    },
};

export const streakApi = {
    update: async (date: string, totalSeconds: number, goalMet: boolean): Promise<void> => {
        return await invoke('update_streak', { date, totalSeconds, goalMet });
    },

    getCurrent: async (): Promise<number> => {
        return await invoke('get_current_streak');
    },
};
