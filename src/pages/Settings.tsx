import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export const Settings: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Settings</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Configure your preferences and app settings
                    </p>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pomodoro Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="text-4xl mb-2">⚙️</div>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Configure work/break durations
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="text-4xl mb-2">🎯</div>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Set daily productivity goals
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Backup & Export</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="text-4xl mb-2">💾</div>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Backup and restore your data
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
