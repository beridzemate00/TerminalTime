import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Edit2, Trash2, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { sessionApi, projectApi } from '../lib/api';
import { formatDuration, formatDate } from '../lib/utils';
import type { Session, Project } from '../types';

export const Sessions: React.FC = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('week');

    useEffect(() => {
        loadData();
    }, [dateRange]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [sessionsData, projectsData] = await Promise.all([
                sessionApi.getAll(),
                projectApi.getAll(false)
            ]);
            setSessions(sessionsData);
            setProjects(projectsData);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSession = async (sessionId: number) => {
        if (!confirm('Are you sure you want to delete this session?')) return;

        try {
            await sessionApi.delete(sessionId);
            setSessions(sessions.filter(s => s.id !== sessionId));
        } catch (error) {
            console.error('Failed to delete session:', error);
        }
    };

    const getProjectById = (projectId: number) => {
        return projects.find(p => p.id === projectId);
    };

    const filteredSessions = selectedProject
        ? sessions.filter(s => s.project_id === selectedProject)
        : sessions;

    const totalDuration = filteredSessions.reduce((sum, s) => sum + (s.duration_seconds || 0), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Sessions</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        View and manage your time tracking sessions
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-wrap gap-4">
                    <div className="flex gap-2">
                        <Button
                            variant={dateRange === 'today' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setDateRange('today')}
                        >
                            Today
                        </Button>
                        <Button
                            variant={dateRange === 'week' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setDateRange('week')}
                        >
                            This Week
                        </Button>
                        <Button
                            variant={dateRange === 'month' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setDateRange('month')}
                        >
                            This Month
                        </Button>
                        <Button
                            variant={dateRange === 'all' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setDateRange('all')}
                        >
                            All Time
                        </Button>
                    </div>

                    <select
                        className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        value={selectedProject || ''}
                        onChange={(e) => setSelectedProject(e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="">All Projects</option>
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.icon} {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Summary Card */}
                <Card className="mb-6">
                    <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary-600" />
                                <span className="text-slate-600 dark:text-slate-400">Total Time:</span>
                            </div>
                            <span className="text-2xl font-bold text-primary-600">
                                {formatDuration(totalDuration)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-slate-600 dark:text-slate-400">Sessions:</span>
                            <span className="text-xl font-semibold">{filteredSessions.length}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Sessions List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Session History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12 text-slate-500">Loading sessions...</div>
                        ) : filteredSessions.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🕐</div>
                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    No Sessions Yet
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    Start tracking time to see your sessions here
                                </p>
                                <Button variant="primary">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Start Timer
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filteredSessions.map((session) => {
                                    const project = getProjectById(session.project_id);
                                    return (
                                        <div
                                            key={session.id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                {project && (
                                                    <div
                                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                                                        style={{ backgroundColor: project.color + '20' }}
                                                    >
                                                        {project.icon}
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                                                        {project?.name || 'Unknown Project'}
                                                    </h4>
                                                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(session.start_time)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            {formatDuration(session.duration_seconds || 0)}
                                                        </span>
                                                        {session.is_pomodoro && (
                                                            <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs">
                                                                🍅 Pomodoro
                                                            </span>
                                                        )}
                                                    </div>
                                                    {session.notes && (
                                                        <p className="text-sm text-slate-500 mt-1">{session.notes}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteSession(session.id!)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
