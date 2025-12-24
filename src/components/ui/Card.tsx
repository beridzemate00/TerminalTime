import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
    return (
        <div
            className={cn('card', onClick && 'cursor-pointer', className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
};

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
    return (
        <h3 className={cn('text-xl font-semibold text-slate-900 dark:text-slate-100', className)}>
            {children}
        </h3>
    );
};

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
    return (
        <div className={cn(className)}>
            {children}
        </div>
    );
};
