mod commands;
mod db;
mod models;

use commands::*;
use tauri_plugin_sql::{Builder, Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:terminaltime.db",
                    db::get_migrations(),
                )
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            // Project commands
            create_project,
            get_projects,
            update_project,
            archive_project,
            delete_project,
            // Session commands
            start_session,
            stop_session,
            get_active_session,
            get_sessions,
            update_session,
            delete_session,
            // Statistics commands
            get_daily_stats,
            get_project_stats,
            // Pomodoro commands
            get_pomodoro_settings,
            update_pomodoro_settings,
            // Goal & Streak commands
            create_goal,
            get_goals,
            update_streak,
            get_current_streak,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
