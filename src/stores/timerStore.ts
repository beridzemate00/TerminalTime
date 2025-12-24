import { create } from 'zustand';
import type { Session, TimerStatus } from '../types';

interface TimerStore {
    // State
    activeSession: Session | null;
    elapsedSeconds: number;
    status: TimerStatus;
    intervalId: number | null;

    // Actions
    startTimer: (session: Session) => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    stopTimer: () => void;
    tick: () => void;
    setElapsedSeconds: (seconds: number) => void;
    reset: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
    // Initial state
    activeSession: null,
    elapsedSeconds: 0,
    status: 'idle',
    intervalId: null,

    // Start a new timer
    startTimer: (session) => {
        const { intervalId } = get();

        // Clear any existing interval
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Start new interval
        const id = window.setInterval(() => {
            get().tick();
        }, 1000);

        set({
            activeSession: session,
            elapsedSeconds: 0,
            status: 'running',
            intervalId: id,
        });
    },

    // Pause the timer
    pauseTimer: () => {
        const { intervalId } = get();

        if (intervalId) {
            clearInterval(intervalId);
        }

        set({
            status: 'paused',
            intervalId: null,
        });
    },

    // Resume the timer
    resumeTimer: () => {
        const { status } = get();

        if (status !== 'paused') return;

        const id = window.setInterval(() => {
            get().tick();
        }, 1000);

        set({
            status: 'running',
            intervalId: id,
        });
    },

    // Stop the timer completely
    stopTimer: () => {
        const { intervalId } = get();

        if (intervalId) {
            clearInterval(intervalId);
        }

        set({
            activeSession: null,
            elapsedSeconds: 0,
            status: 'idle',
            intervalId: null,
        });
    },

    // Increment elapsed time
    tick: () => {
        set((state) => ({
            elapsedSeconds: state.elapsedSeconds + 1,
        }));
    },

    // Manually set elapsed seconds (for resuming sessions)
    setElapsedSeconds: (seconds) => {
        set({ elapsedSeconds: seconds });
    },

    // Reset to initial state
    reset: () => {
        const { intervalId } = get();

        if (intervalId) {
            clearInterval(intervalId);
        }

        set({
            activeSession: null,
            elapsedSeconds: 0,
            status: 'idle',
            intervalId: null,
        });
    },
}));
