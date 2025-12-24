import React, { useState, useEffect } from 'react';
import { Play, Plus } from 'lucide-react';
import { TimerDisplay } from '../components/timer/TimerDisplay';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTimerStore } from '../stores/timerStore';
import { sessionApi, projectApi } from '../lib/api';
import { formatDurationHuman } from '../lib/utils';
import type { Project } from '../types';

export const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { startTimer, status, elapsedSeconds } = useTimerStore();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await projectApi.getAll(false);
            setProjects(data);
        } catch (error) {
            console.error('Failed to load projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartTimer = async (project: Project) => {
        if (status !== 'idle') {
            alert('Please stop the current timer first');
            return;
        }

        try {
            const sessionId = await sessionApi.start(project.id!, false);

            startTimer({
                id: sessionId,
                project_id: project.id!,
                start_time: new Date().toISOString(),
                duration_seconds: 0,
                is_pomodoro: false,
            });
        } catch (error) {
            console.error('Failed to start session:', error);
            alert('Failed to start timer');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">TerminalTime</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Track your time, stay focused, achieve your goals
                    </p>
                </div>

                {/* Active Timer */}
                {status !== 'idle' && (
                    <div className="mb-8 animate-slide-up">
                        <TimerDisplay />
                    </div>
                )}

                {/* Quick Start */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Start</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="text-center py-8 text-slate-500">Loading projects...</div>
                            ) : projects.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-slate-500 mb-4">No projects yet</p>
                                    <Button variant="primary">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Your First Project
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {projects.slice(0, 5).map((project) => (
                                        <div
                                            key={project.id}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
                                                    style={{ backgroundColor: project.color + '20' }}
                                                >
                                                    {project.icon}
                                                </div>
                                                <span className="font-medium">{project.name}</span>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleStartTimer(project)}
                                                disabled={status !== 'idle'}
                                            >
                                                <Play className="w-4 h-4 mr-1" />
                                                Start
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Total Time</span>
                                    <span className="text-2xl font-bold text-primary-600">
                                        {formatDurationHuman(elapsedSeconds)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Sessions</span>
                                    <span className="text-2xl font-bold">0</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Current Streak</span>
                                    <span className="text-2xl font-bold">🔥 0 days</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Welcome Message */}
                {projects.length === 0 && !loading && (
                    <Card className="bg-gradient-to-r from-primary-500 to-purple-600 text-white border-none">
                        <CardContent className="text-center py-12">
                            <h2 className="text-3xl font-bold mb-4">Welcome to TerminalTime! 🚀</h2>
                            <p className="text-lg text-primary-100 mb-6">
                                Start tracking your productivity by creating your first project
                            </p>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="bg-white text-primary-600 hover:bg-primary-50"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create Project
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};
