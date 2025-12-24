import React from 'react';
import { cn } from '../../lib/utils';

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    label?: string;
}

const PRESET_COLORS = [
    '#6366f1', // Indigo
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#f43f5e', // Rose
    '#ef4444', // Red
    '#f97316', // Orange
    '#f59e0b', // Amber
    '#eab308', // Yellow
    '#84cc16', // Lime
    '#22c55e', // Green
    '#10b981', // Emerald
    '#14b8a6', // Teal
    '#06b6d4', // Cyan
    '#0ea5e9', // Sky
    '#3b82f6', // Blue
    '#6366f1', // Indigo
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                </label>
            )}

            <div className="grid grid-cols-8 gap-2">
                {PRESET_COLORS.map((color) => (
                    <button
                        key={color}
                        type="button"
                        onClick={() => onChange(color)}
                        className={cn(
                            'w-10 h-10 rounded-lg transition-all hover:scale-110',
                            value === color && 'ring-2 ring-offset-2 ring-slate-400 dark:ring-slate-600 scale-110'
                        )}
                        style={{ backgroundColor: color }}
                        title={color}
                    />
                ))}
            </div>

            {/* Custom color input */}
            <div className="mt-3 flex items-center gap-2">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-300 dark:border-slate-600"
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#6366f1"
                    className="input flex-1"
                    pattern="^#[0-9A-Fa-f]{6}$"
                />
            </div>
        </div>
    );
};
