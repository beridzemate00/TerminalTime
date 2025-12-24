import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    Clock,
    BarChart3,
    Focus,
    Settings,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/sessions', icon: Clock, label: 'Sessions' },
    { to: '/stats', icon: BarChart3, label: 'Statistics' },
    { to: '/focus', icon: Focus, label: 'Focus' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 h-screen glass border-r border-slate-200 dark:border-slate-700 flex flex-col sticky top-0">
            {/* Logo */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                        ⏱️
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gradient">TerminalTime</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Time Tracker</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    className={cn(
                                        'w-5 h-5 transition-transform group-hover:scale-110',
                                        isActive && 'text-primary-600 dark:text-primary-400'
                                    )}
                                />
                                <span>{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    <p>Made with ❤️</p>
                    <p className="mt-1">v1.0.0</p>
                </div>
            </div>
        </aside>
    );
};
