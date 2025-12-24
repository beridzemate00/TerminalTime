import { create } from 'zustand';
import type { PomodoroPhase, PomodoroSettings } from '../types';

interface PomodoroStore {
    // State
    phase: PomodoroPhase;
    cycleCount: number;
    remainingSeconds: number;
    isRunning: boolean;
    intervalId: number | null;
    settings: PomodoroSettings | null;
    linkedProjectId: number | null;

    // Actions
    setSettings: (settings: PomodoroSettings) => void;
    linkProject: (projectId: number | null) => void;
    start: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    skip: () => void;
    tick: () => void;
    nextPhase: () => void;
}

export const usePomodoroStore = create<PomodoroStore>((set, get) => ({
    // Initial state
    phase: 'work',
    cycleCount: 0,
    remainingSeconds: 1500, // 25 minutes default
    isRunning: false,
    intervalId: null,
    settings: null,
    linkedProjectId: null,

    // Set pomodoro settings
    setSettings: (settings) => {
        set({
            settings,
            remainingSeconds: settings.work_duration,
        });
    },

    // Link to a project
    linkProject: (projectId) => {
        set({ linkedProjectId: projectId });
    },

    // Start pomodoro
    start: () => {
        const { intervalId, settings } = get();

        if (!settings) return;

        // Clear any existing interval
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Start new interval
        const id = window.setInterval(() => {
            get().tick();
        }, 1000);

        set({
            isRunning: true,
            intervalId: id,
        });
    },

    // Pause pomodoro
    pause: () => {
        const { intervalId } = get();

        if (intervalId) {
            clearInterval(intervalId);
        }

        set({
            isRunning: false,
            intervalId: null,
        });
    },

    // Resume pomodoro
    resume: () => {
        const { isRunning } = get();

        if (isRunning) return;

        const id = window.setInterval(() => {
            get().tick();
        }, 1000);

        set({
            isRunning: true,
            intervalId: id,
        });
    },

    // Reset pomodoro
    reset: () => {
        const { intervalId, settings } = get();

        if (intervalId) {
            clearInterval(intervalId);
        }

        set({
            phase: 'work',
            cycleCount: 0,
            remainingSeconds: settings?.work_duration || 1500,
            isRunning: false,
            intervalId: null,
        });
    },

    // Skip to next phase
    skip: () => {
        get().nextPhase();
    },

    // Decrement time
    tick: () => {
        const { remainingSeconds } = get();

        if (remainingSeconds > 0) {
            set({ remainingSeconds: remainingSeconds - 1 });
        } else {
            get().nextPhase();
        }
    },

    // Move to next phase
    nextPhase: () => {
        const { phase, cycleCount, settings } = get();

        if (!settings) return;

        let newPhase: PomodoroPhase;
        let newCycleCount = cycleCount;
        let duration: number;

        if (phase === 'work') {
            newCycleCount += 1;

            if (newCycleCount % settings.cycles_before_long_break === 0) {
                newPhase = 'long_break';
                duration = settings.long_break;
            } else {
                newPhase = 'short_break';
                duration = settings.short_break;
            }
        } else {
            newPhase = 'work';
            duration = settings.work_duration;
        }

        set({
            phase: newPhase,
            cycleCount: newCycleCount,
            remainingSeconds: duration,
        });

        // Send notification if enabled
        if (settings.notifications_enabled) {
            const message = newPhase === 'work'
                ? 'Break time is over! Time to focus.'
                : 'Work session complete! Take a break.';

            // TODO: Send Tauri notification
            console.log('Notification:', message);
        }
    },
}));
