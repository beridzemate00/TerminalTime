use tauri::AppHandle;
use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "
                CREATE TABLE IF NOT EXISTS projects (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    color TEXT DEFAULT '#6366f1',
                    icon TEXT DEFAULT '📁',
                    tags TEXT,
                    archived BOOLEAN DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );

                CREATE TABLE IF NOT EXISTS sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    project_id INTEGER NOT NULL,
                    start_time DATETIME NOT NULL,
                    end_time DATETIME,
                    duration_seconds INTEGER DEFAULT 0,
                    notes TEXT,
                    is_pomodoro BOOLEAN DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS pomodoro_settings (
                    id INTEGER PRIMARY KEY CHECK (id = 1),
                    work_duration INTEGER DEFAULT 1500,
                    short_break INTEGER DEFAULT 300,
                    long_break INTEGER DEFAULT 900,
                    cycles_before_long_break INTEGER DEFAULT 4,
                    sound_enabled BOOLEAN DEFAULT 1,
                    notifications_enabled BOOLEAN DEFAULT 1
                );

                CREATE TABLE IF NOT EXISTS goals (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    project_id INTEGER,
                    daily_target_seconds INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
                );

                CREATE TABLE IF NOT EXISTS streaks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date DATE UNIQUE NOT NULL,
                    total_seconds INTEGER DEFAULT 0,
                    goal_met BOOLEAN DEFAULT 0
                );

                -- Insert default pomodoro settings
                INSERT OR IGNORE INTO pomodoro_settings (id) VALUES (1);

                -- Create indexes for better query performance
                CREATE INDEX IF NOT EXISTS idx_sessions_project_id ON sessions(project_id);
                CREATE INDEX IF NOT EXISTS idx_sessions_start_time ON sessions(start_time);
                CREATE INDEX IF NOT EXISTS idx_streaks_date ON streaks(date);
            ",
            kind: MigrationKind::Up,
        }
    ]
}
