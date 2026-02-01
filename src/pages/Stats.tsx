import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { statsApi, projectApi } from '../lib/api';
import { formatDuration } from '../lib/utils';
import type { Project } from '../types';

interface DailyStats {
    date: string;
    total_seconds: number;
}

interface ProjectStats {
    project_id: number;
    total_seconds: number;
}

export const Stats: React.FC = () => {
    const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
    const [projectStats, setProjectStats] = useState<ProjectStats[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

    useEffect(() => {
        loadStats();
    }, [timeRange]);

    const loadStats = async () => {
        try {
            setLoading(true);
            const days = timeRange === 'week' ? 7 : 30;
            const [daily, byProject, projectsData] = await Promise.all([
                statsApi.getDaily(days),
                statsApi.getByProject(days),
                projectApi.getAll(false)
            ]);
            setDailyStats(daily);
            setProjectStats(byProject);
            setProjects(projectsData);
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const getProjectById = (projectId: number) => {
        return projects.find(p => p.id === projectId);
    };

    const totalTime = dailyStats.reduce((sum, day) => sum + day.total_seconds, 0);
    const avgPerDay = dailyStats.length > 0 ? totalTime / dailyStats.length : 0;
    const maxDay = Math.max(...dailyStats.map(d => d.total_seconds), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Statistics</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Analyze your productivity and track your progress
                    </p>
                </div>

                {/* Time Range Selector */}
                <div className="mb-6 flex gap-2">
                    <Button
                        variant={timeRange === 'week' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setTimeRange('week')}
                    >
                        Last 7 Days
                    </Button>
                    <Button
                        variant={timeRange === 'month' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setTimeRange('month')}
                    >
                        Last 30 Days
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-slate-500">Loading statistics...</div>
                ) : (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card>
                                <CardContent className="py-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Time</p>
                                            <p className="text-3xl font-bold text-primary-600">
                                                {formatDuration(totalTime)}
                                            </p>
                                        </div>
                                        <Clock className="w-12 h-12 text-primary-600 opacity-20" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="py-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Avg Per Day</p>
                                            <p className="text-3xl font-bold text-emerald-600">
                                                {formatDuration(Math.round(avgPerDay))}
                                            </p>
                                        </div>
                                        <TrendingUp className="w-12 h-12 text-emerald-600 opacity-20" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="py-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Best Day</p>
                                            <p className="text-3xl font-bold text-amber-600">
                                                {formatDuration(maxDay)}
                                            </p>
                                        </div>
                                        <Target className="w-12 h-12 text-amber-600 opacity-20" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Daily Activity Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Daily Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {dailyStats.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="text-4xl mb-2">📊</div>
                                            <p className="text-slate-600 dark:text-slate-400">No data for this period</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {dailyStats.map((day, index) => {
                                                const percentage = maxDay > 0 ? (day.total_seconds / maxDay) * 100 : 0;
                                                const date = new Date(day.date);
                                                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                                                const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                                                return (
                                                    <div key={index} className="space-y-1">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-slate-600 dark:text-slate-400">
                                                                {dayName}, {dayDate}
                                                            </span>
                                                            <span className="font-semibold">
                                                                {formatDuration(day.total_seconds)}
                                                            </span>
                                                        </div>
                                                        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-primary-500 to-purple-600 transition-all duration-500 flex items-center justify-end px-2"
                                                                style={{ width: `${percentage}%` }}
                                                            >
                                                                {percentage > 20 && (
                                                                    <span className="text-white text-xs font-medium">
                                                                        {Math.round(percentage)}%
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Project Breakdown */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {projectStats.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="text-4xl mb-2">📈</div>
                                            <p className="text-slate-600 dark:text-slate-400">No project data</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {projectStats.map((stat) => {
                                                const project = getProjectById(stat.project_id);
                                                const percentage = totalTime > 0 ? (stat.total_seconds / totalTime) * 100 : 0;

                                                if (!project) return null;

                                                return (
                                                    <div key={stat.project_id} className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                                                                    style={{ backgroundColor: project.color + '20' }}
                                                                >
                                                                    {project.icon}
                                                                </div>
                                                                <span className="font-medium">{project.name}</span>
                                                            </div>
                                                            <span className="text-sm font-semibold">
                                                                {formatDuration(stat.total_seconds)}
                                                            </span>
                                                        </div>
                                                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full transition-all duration-500"
                                                                style={{
                                                                    width: `${percentage}%`,
                                                                    backgroundColor: project.color
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="text-xs text-slate-500 text-right">
                                                            {percentage.toFixed(1)}% of total time
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
