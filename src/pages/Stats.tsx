import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export const Stats: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Statistics</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Analyze your productivity and track your progress
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="text-4xl mb-2">📊</div>
                                <p className="text-slate-600 dark:text-slate-400">Charts coming soon</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Project Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="text-4xl mb-2">📈</div>
                                <p className="text-slate-600 dark:text-slate-400">Charts coming soon</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
