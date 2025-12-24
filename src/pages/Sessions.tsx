import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export const Sessions: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Sessions</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        View and manage your time tracking sessions
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Session History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🕐</div>
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                Coming Soon
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Session history and management features are being built
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
