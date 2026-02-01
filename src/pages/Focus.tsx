import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Settings as SettingsIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { usePomodoroStore } from '../stores/pomodoroStore';
import { pomodoroApi, projectApi } from '../lib/api';
import { formatDuration } from '../lib/utils';
import type { Project, PomodoroSettings } from '../types';

export const Focus: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showSettings, setShowSettings] = useState(false);
    const [settingsForm, setSettingsForm] = useState<PomodoroSettings>({
        id: 1,
        work_duration: 1500,
        short_break: 300,
        long_break: 900,
        cycles_before_long_break: 4,
        sound_enabled: true,
        notifications_enabled: true,
    });

    const {
        phase,
        cycleCount,
        remainingSeconds,
        isRunning,
        settings,
        linkedProjectId,
        setSettings,
        linkProject,
        start,
        pause,
        resume,
        reset,
        skip,
    } = usePomodoroStore();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [pomodoroSettings, projectsData] = await Promise.all([
                pomodoroApi.getSettings(),
                projectApi.getAll(false)
            ]);

            if (pomodoroSettings) {
                setSettings(pomodoroSettings);
                setSettingsForm(pomodoroSettings);
            }
            setProjects(projectsData);
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    };

    const handleSaveSettings = async () => {
        try {
            await pomodoroApi.updateSettings(settingsForm);
            setSettings(settingsForm);
            setShowSettings(false);
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    };

    const getPhaseLabel = () => {
        switch (phase) {
            case 'work':
                return 'Focus Time';
            case 'short_break':
                return 'Short Break';
            case 'long_break':
                return 'Long Break';
        }
    };

    const getPhaseColor = () => {
        switch (phase) {
            case 'work':
                return 'from-red-500 to-orange-600';
            case 'short_break':
                return 'from-emerald-500 to-teal-600';
            case 'long_break':
                return 'from-blue-500 to-indigo-600';
        }
    };

    const progress = settings
        ? ((settings[phase === 'work' ? 'work_duration' : phase === 'short_break' ? 'short_break' : 'long_break'] - remainingSeconds) /
            settings[phase === 'work' ? 'work_duration' : phase === 'short_break' ? 'short_break' : 'long_break']) * 100
        : 0;

    const selectedProject = projects.find(p => p.id === linkedProjectId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Focus Mode</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Stay focused with Pomodoro technique
                    </p>
                </div>

                {/* Main Timer Card */}
                <Card className={`bg-gradient-to-br ${getPhaseColor()} text-white border-none shadow-2xl mb-6`}>
                    <CardContent className="text-center py-12">
                        {/* Phase Label */}
                        <div className="text-2xl font-semibold mb-2 opacity-90">
                            {getPhaseLabel()}
                        </div>

                        {/* Cycle Count */}
                        <div className="text-sm opacity-75 mb-8">
                            Cycle {cycleCount + 1} • {phase === 'work' ? '🍅' : '☕'}
                        </div>

                        {/* Circular Progress */}
                        <div className="relative w-64 h-64 mx-auto mb-8">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="120"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    className="opacity-20"
                                />
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="120"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 120}`}
                                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                                    className="transition-all duration-1000"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-6xl font-bold font-mono">
                                    {formatDuration(remainingSeconds)}
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4">
                            {!isRunning && remainingSeconds === (settings?.[phase === 'work' ? 'work_duration' : phase === 'short_break' ? 'short_break' : 'long_break'] || 0) ? (
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    onClick={start}
                                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                                >
                                    <Play className="w-6 h-6 mr-2" />
                                    Start
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={isRunning ? pause : resume}
                                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                                    >
                                        {isRunning ? (
                                            <>
                                                <Pause className="w-6 h-6 mr-2" />
                                                Pause
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-6 h-6 mr-2" />
                                                Resume
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={skip}
                                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                                    >
                                        <SkipForward className="w-6 h-6 mr-2" />
                                        Skip
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={reset}
                                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                                    >
                                        <RotateCcw className="w-6 h-6 mr-2" />
                                        Reset
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Running Indicator */}
                        {isRunning && (
                            <div className="mt-6 flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse-slow"></div>
                                <span className="ml-2 text-sm opacity-75">In Progress...</span>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Linked Project</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <select
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                                value={linkedProjectId || ''}
                                onChange={(e) => linkProject(e.target.value ? Number(e.target.value) : null)}
                            >
                                <option value="">No Project</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.icon} {project.name}
                                    </option>
                                ))}
                            </select>
                            {selectedProject && (
                                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: selectedProject.color + '20' }}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{selectedProject.icon}</span>
                                        <span className="font-medium">{selectedProject.name}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Settings */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Settings</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowSettings(!showSettings)}
                                >
                                    <SettingsIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {showSettings ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Work Duration (minutes)</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                                            value={settingsForm.work_duration / 60}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, work_duration: Number(e.target.value) * 60 })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Short Break (minutes)</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                                            value={settingsForm.short_break / 60}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, short_break: Number(e.target.value) * 60 })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Long Break (minutes)</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                                            value={settingsForm.long_break / 60}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, long_break: Number(e.target.value) * 60 })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Cycles Before Long Break</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                                            value={settingsForm.cycles_before_long_break}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, cycles_before_long_break: Number(e.target.value) })}
                                        />
                                    </div>
                                    <Button variant="primary" onClick={handleSaveSettings} className="w-full">
                                        Save Settings
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Work:</span>
                                        <span className="font-semibold">{(settings?.work_duration || 0) / 60} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Short Break:</span>
                                        <span className="font-semibold">{(settings?.short_break || 0) / 60} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Long Break:</span>
                                        <span className="font-semibold">{(settings?.long_break || 0) / 60} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Cycles:</span>
                                        <span className="font-semibold">{settings?.cycles_before_long_break || 0}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
