import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export const Focus: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Focus Mode</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Stay focused with Pomodoro technique
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Pomodoro Timer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🍅</div>
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                Coming Soon
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Pomodoro timer with customizable work/break intervals
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
