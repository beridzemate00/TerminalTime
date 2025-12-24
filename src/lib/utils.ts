/**
 * Format seconds into HH:MM:SS or MM:SS format
 */
export function formatDuration(seconds: number, includeHours: boolean = true): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (includeHours || hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format seconds into human-readable format (e.g., "2h 30m")
 */
export function formatDurationHuman(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    if (minutes > 0) {
        return `${minutes}m`;
    }

    return `${seconds}s`;
}

/**
 * Convert seconds to hours with decimal
 */
export function secondsToHours(seconds: number): number {
    return Math.round((seconds / 3600) * 100) / 100;
}

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get date range for common periods
 */
export function getDateRange(period: 'today' | 'week' | 'month'): { start: string; end: string } {
    const now = new Date();
    const end = formatDate(now);

    let start: string;

    switch (period) {
        case 'today':
            start = end;
            break;
        case 'week':
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            start = formatDate(weekAgo);
            break;
        case 'month':
            const monthAgo = new Date(now);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            start = formatDate(monthAgo);
            break;
    }

    return { start, end };
}

/**
 * Parse tags from JSON string
 */
export function parseTags(tagsJson?: string): string[] {
    if (!tagsJson) return [];
    try {
        return JSON.parse(tagsJson);
    } catch {
        return [];
    }
}

/**
 * Stringify tags to JSON
 */
export function stringifyTags(tags: string[]): string {
    return JSON.stringify(tags);
}

/**
 * Get contrasting text color for a background color
 */
export function getContrastColor(hexColor: string): string {
    // Remove # if present
    const hex = hexColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Class name utility (simple version of clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}
