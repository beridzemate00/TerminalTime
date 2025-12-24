import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ColorPicker } from '../ui/ColorPicker';
import { EmojiPicker } from '../ui/EmojiPicker';
import type { Project } from '../../types';
import { stringifyTags, parseTags } from '../../lib/utils';

interface ProjectFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (project: Omit<Project, 'id' | 'created_at'>) => Promise<void>;
    project?: Project | null;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    project,
}) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#6366f1');
    const [icon, setIcon] = useState('📁');
    const [tagsInput, setTagsInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ name?: string }>({});

    useEffect(() => {
        if (project) {
            setName(project.name);
            setColor(project.color);
            setIcon(project.icon);
            const tags = parseTags(project.tags);
            setTagsInput(tags.join(', '));
        } else {
            // Reset form for new project
            setName('');
            setColor('#6366f1');
            setIcon('📁');
            setTagsInput('');
        }
        setErrors({});
    }, [project, isOpen]);

    const validate = () => {
        const newErrors: { name?: string } = {};

        if (!name.trim()) {
            newErrors.name = 'Project name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
            const tags = tagsInput
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);

            await onSubmit({
                name: name.trim(),
                color,
                icon,
                tags: tags.length > 0 ? stringifyTags(tags) : undefined,
                archived: project?.archived || false,
            });

            onClose();
        } catch (error) {
            console.error('Failed to save project:', error);
            alert('Failed to save project. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={project ? 'Edit Project' : 'Create New Project'}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Name */}
                <Input
                    label="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Client Website, Math Study, Gym Routine"
                    error={errors.name}
                    autoFocus
                />

                {/* Icon Picker */}
                <EmojiPicker
                    label="Project Icon"
                    value={icon}
                    onChange={setIcon}
                />

                {/* Color Picker */}
                <ColorPicker
                    label="Project Color"
                    value={color}
                    onChange={setColor}
                />

                {/* Tags */}
                <Input
                    label="Tags (comma-separated)"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="e.g., coding, client, urgent"
                />

                {/* Preview */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Preview:</p>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                            style={{
                                backgroundColor: color + '20',
                                color: color,
                            }}
                        >
                            {icon}
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                                {name || 'Project Name'}
                            </div>
                            {tagsInput && (
                                <div className="flex gap-1 mt-1">
                                    {tagsInput.split(',').map((tag, index) => (
                                        <span
                                            key={index}
                                            className="badge badge-primary text-xs"
                                        >
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
