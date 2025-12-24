import React, { useState } from 'react';
import { cn } from '../../lib/utils';

interface EmojiPickerProps {
    value: string;
    onChange: (emoji: string) => void;
    label?: string;
}

const EMOJI_CATEGORIES = {
    Work: ['💼', '📊', '📈', '💻', '⚙️', '🔧', '🛠️', '📝', '📋', '📌'],
    Study: ['📚', '📖', '✏️', '📓', '🎓', '🧠', '💡', '🔬', '🧪', '📐'],
    Creative: ['🎨', '🎭', '🎬', '🎵', '🎸', '📷', '✨', '🌟', '💫', '🎪'],
    Fitness: ['💪', '🏃', '🚴', '⛹️', '🏋️', '🧘', '🥇', '🏆', '⚽', '🏀'],
    Personal: ['🏠', '👤', '❤️', '🌱', '🌻', '🌈', '☀️', '🌙', '⭐', '🔥'],
    Other: ['📁', '🎯', '🚀', '⏰', '📅', '🔔', '💰', '🎁', '🌍', '🎮'],
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ value, onChange, label }) => {
    const [activeCategory, setActiveCategory] = useState<keyof typeof EMOJI_CATEGORIES>('Work');

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                </label>
            )}

            {/* Current Selection */}
            <div className="mb-3 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl">
                    {value || '📁'}
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Or type emoji..."
                    className="input flex-1"
                    maxLength={2}
                />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-3 overflow-x-auto custom-scrollbar pb-2">
                {Object.keys(EMOJI_CATEGORIES).map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category as keyof typeof EMOJI_CATEGORIES)}
                        className={cn(
                            'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                            activeCategory === category
                                ? 'bg-primary-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Emoji Grid */}
            <div className="grid grid-cols-10 gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg max-h-48 overflow-y-auto custom-scrollbar">
                {EMOJI_CATEGORIES[activeCategory].map((emoji, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onChange(emoji)}
                        className={cn(
                            'w-10 h-10 rounded-lg text-2xl transition-all hover:scale-110 hover:bg-slate-200 dark:hover:bg-slate-700',
                            value === emoji && 'bg-primary-100 dark:bg-primary-900 scale-110'
                        )}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};
