import React, { useState, useEffect } from 'react';
import { Plus, Archive, Grid3x3, List } from 'lucide-react';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectForm } from '../components/projects/ProjectForm';
import { Button } from '../components/ui/Button';
import { useTimerStore } from '../stores/timerStore';
import { projectApi, sessionApi } from '../lib/api';
import type { Project } from '../types';

export const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showArchived, setShowArchived] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const { startTimer, status } = useTimerStore();

    useEffect(() => {
        loadProjects();
    }, [showArchived]);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const data = await projectApi.getAll(showArchived);
            setProjects(data);
        } catch (error) {
            console.error('Failed to load projects:', error);
            alert('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (projectData: Omit<Project, 'id' | 'created_at'>) => {
        try {
            await projectApi.create(
                projectData.name,
                projectData.color,
                projectData.icon,
                projectData.tags
            );
            await loadProjects();
        } catch (error) {
            console.error('Failed to create project:', error);
            throw error;
        }
    };

    const handleUpdateProject = async (projectData: Omit<Project, 'id' | 'created_at'>) => {
        if (!editingProject?.id) return;

        try {
            await projectApi.update(
                editingProject.id,
                projectData.name,
                projectData.color,
                projectData.icon,
                projectData.tags
            );
            await loadProjects();
        } catch (error) {
            console.error('Failed to update project:', error);
            throw error;
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

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setIsFormOpen(true);
    };

    const handleArchiveProject = async (project: Project) => {
        try {
            await projectApi.archive(project.id!, !project.archived);
            await loadProjects();
        } catch (error) {
            console.error('Failed to archive project:', error);
            alert('Failed to archive project');
        }
    };

    const handleDeleteProject = async (project: Project) => {
        if (!confirm(`Are you sure you want to delete "${project.name}"? This will also delete all associated sessions.`)) {
            return;
        }

        try {
            await projectApi.delete(project.id!);
            await loadProjects();
        } catch (error) {
            console.error('Failed to delete project:', error);
            alert('Failed to delete project');
        }
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingProject(null);
    };

    const handleFormSubmit = async (projectData: Omit<Project, 'id' | 'created_at'>) => {
        if (editingProject) {
            await handleUpdateProject(projectData);
        } else {
            await handleCreateProject(projectData);
        }
    };

    const activeProjects = projects.filter((p) => !p.archived);
    const archivedProjects = projects.filter((p) => p.archived);
    const displayProjects = showArchived ? archivedProjects : activeProjects;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gradient mb-2">Projects</h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                Manage your projects and track time
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 rounded-lg p-1 shadow-sm">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded ${viewMode === 'grid'
                                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-600'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <Grid3x3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded ${viewMode === 'list'
                                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-600'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Archive Toggle */}
                            <Button
                                variant="secondary"
                                onClick={() => setShowArchived(!showArchived)}
                            >
                                <Archive className="w-4 h-4 mr-2" />
                                {showArchived ? 'Show Active' : 'Show Archived'}
                            </Button>

                            {/* Create Button */}
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setEditingProject(null);
                                    setIsFormOpen(true);
                                }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                New Project
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 text-sm">
                        <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                            <span className="text-slate-600 dark:text-slate-400">Active: </span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {activeProjects.length}
                            </span>
                        </div>
                        <div className="px-4 py-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                            <span className="text-slate-600 dark:text-slate-400">Archived: </span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {archivedProjects.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Projects Grid/List */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
                        <p className="mt-4 text-slate-600 dark:text-slate-400">Loading projects...</p>
                    </div>
                ) : displayProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📁</div>
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                            {showArchived ? 'No Archived Projects' : 'No Projects Yet'}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {showArchived
                                ? 'You haven\'t archived any projects yet'
                                : 'Create your first project to start tracking time'}
                        </p>
                        {!showArchived && (
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setIsFormOpen(true)}
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create Your First Project
                            </Button>
                        )}
                    </div>
                ) : (
                    <div
                        className={
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'space-y-4'
                        }
                    >
                        {displayProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onStart={handleStartTimer}
                                onEdit={handleEditProject}
                                onArchive={handleArchiveProject}
                                onDelete={handleDeleteProject}
                                isTimerActive={status !== 'idle'}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Project Form Modal */}
            <ProjectForm
                isOpen={isFormOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                project={editingProject}
            />
        </div>
    );
};
