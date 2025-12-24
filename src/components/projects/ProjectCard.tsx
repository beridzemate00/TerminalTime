import React from 'react';
import { Play, Edit2, Archive, Trash2, MoreVertical } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { Project } from '../../types';
import { getContrastColor, parseTags } from '../../lib/utils';

interface ProjectCardProps {
    project: Project;
    onStart: (project: Project) => void;
    onEdit: (project: Project) => void;
    onArchive: (project: Project) => void;
    onDelete: (project: Project) => void;
    isTimerActive: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    onStart,
    onEdit,
    onArchive,
    onDelete,
    isTimerActive,
}) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const tags = parseTags(project.tags);
    const textColor = getContrastColor(project.color);

    return (
        <Card className="relative group hover:shadow-2xl transition-all duration-300">
            {/* Project Header with Color */}
            <div
                className="absolute top-0 left-0 right-0 h-2 rounded-t-2xl"
                style={{ backgroundColor: project.color }}
            />

            <div className="pt-4">
                {/* Icon and Name */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-lg"
                            style={{
                                backgroundColor: project.color + '20',
                                color: project.color,
                            }}
                        >
                            {project.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                {project.name}
                            </h3>
                            {project.archived && (
                                <span className="text-xs text-slate-500 dark:text-slate-400">Archived</span>
                            )}
                        </div>
                    </div>

                    {/* Menu Button */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        {/* Dropdown Menu */}
                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-xl z-20 overflow-hidden">
                                    <button
                                        onClick={() => {
                                            onEdit(project);
                                            setShowMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            onArchive(project);
                                            setShowMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors"
                                    >
                                        <Archive className="w-4 h-4" />
                                        {project.archived ? 'Unarchive' : 'Archive'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            onDelete(project);
                                            setShowMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="badge badge-primary text-xs"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Stats Placeholder */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="text-center p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">0h</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">This Week</div>
                    </div>
                    <div className="text-center p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">0</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Sessions</div>
                    </div>
                </div>

                {/* Start Button */}
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => onStart(project)}
                    disabled={isTimerActive || project.archived}
                    style={{
                        backgroundColor: project.color,
                        color: textColor,
                    }}
                >
                    <Play className="w-4 h-4 mr-2" />
                    Start Timer
                </Button>
            </div>
        </Card>
    );
};
