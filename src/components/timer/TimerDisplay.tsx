import React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useTimerStore } from '../../stores/timerStore';
import { formatDuration } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

export const TimerDisplay: React.FC = () => {
    const { elapsedSeconds, status, pauseTimer, resumeTimer, stopTimer } = useTimerStore();

    const handlePlayPause = () => {
        if (status === 'running') {
            pauseTimer();
        } else if (status === 'paused') {
            resumeTimer();
        }
    };

    const handleStop = () => {
        if (confirm('Are you sure you want to stop this session?')) {
            stopTimer();
        }
    };

    if (status === 'idle') {
        return null;
    }

    return (
        <Card className="bg-gradient-to-br from-primary-500 to-purple-600 text-white border-none shadow-2xl">
            <CardContent className="text-center py-8">
                {/* Timer Display */}
                <div className="mb-6">
                    <div className="text-6xl md:text-7xl font-bold font-mono tracking-tight">
                        {formatDuration(elapsedSeconds)}
                    </div>
                    <div className="text-primary-100 mt-2 text-lg">
                        {status === 'running' ? 'Timer Running' : 'Timer Paused'}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={handlePlayPause}
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                    >
                        {status === 'running' ? (
                            <>
                                <Pause className="w-5 h-5 mr-2" />
                                Pause
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5 mr-2" />
                                Resume
                            </>
                        )}
                    </Button>

                    <Button
                        variant="danger"
                        size="lg"
                        onClick={handleStop}
                        className="bg-red-500/80 hover:bg-red-600 border-none"
                    >
                        <Square className="w-5 h-5 mr-2" />
                        Stop
                    </Button>
                </div>

                {/* Pulsing indicator */}
                {status === 'running' && (
                    <div className="mt-6 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse-slow"></div>
                        <span className="ml-2 text-sm text-primary-100">Recording...</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
