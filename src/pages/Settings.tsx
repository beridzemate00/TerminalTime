import React, { useState } from 'react';
import { Moon, Sun, Download, Upload, Save, Bell, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Settings: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [sounds, setSounds] = useState(true);
    const [dailyGoal, setDailyGoal] = useState(8);

    const handleExportData = () => {
        // TODO: Implement database export
        alert('Export functionality coming soon!');
    };

    const handleImportData = () => {
        // TODO: Implement database import
        alert('Import functionality coming soon!');
    };

    const handleSaveSettings = () => {
        // TODO: Save settings to database
        alert('Settings saved successfully!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gradient mb-2">Settings</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Customize your TerminalTime experience
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Appearance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                        <div>
                                            <p className="font-medium">Dark Mode</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                Toggle dark theme
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={darkMode}
                                            onChange={(e) => setDarkMode(e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-5 h-5" />
                                        <div>
                                            <p className="font-medium">Enable Notifications</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                Get notified about Pomodoro phases and goals
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={notifications}
                                            onChange={(e) => setNotifications(e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-5 h-5 text-xl">🔔</span>
                                        <div>
                                            <p className="font-medium">Sound Effects</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                Play sounds for timer events
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={sounds}
                                            onChange={(e) => setSounds(e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Goals */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Target className="w-5 h-5" />
                                    <div className="flex-1">
                                        <p className="font-medium mb-2">Daily Time Goal (hours)</p>
                                        <input
                                            type="number"
                                            min="1"
                                            max="24"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                                            value={dailyGoal}
                                            onChange={(e) => setDailyGoal(Number(e.target.value))}
                                        />
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            Set your daily productivity target
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Management */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium mb-3">Backup & Restore</p>
                                    <div className="flex gap-3">
                                        <Button variant="secondary" onClick={handleExportData}>
                                            <Download className="w-4 h-4 mr-2" />
                                            Export Data
                                        </Button>
                                        <Button variant="secondary" onClick={handleImportData}>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Import Data
                                        </Button>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                        Export your database for backup or import from a previous backup
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <p className="font-medium mb-2 text-red-600">Danger Zone</p>
                                    <Button variant="danger" size="sm">
                                        Clear All Data
                                    </Button>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                        Permanently delete all projects, sessions, and settings
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* About */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Version:</span>
                                    <span className="font-semibold">1.0.0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Built with:</span>
                                    <span className="font-semibold">Tauri + React + Rust</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">License:</span>
                                    <span className="font-semibold">MIT</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button variant="primary" size="lg" onClick={handleSaveSettings}>
                            <Save className="w-5 h-5 mr-2" />
                            Save All Settings
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
