use crate::models::*;
use tauri::State;
use tauri_plugin_sql::{Builder, Migration, MigrationKind};

// ============================================================================
// PROJECT COMMANDS
// ============================================================================

#[tauri::command]
pub async fn create_project(
    name: String,
    color: String,
    icon: String,
    tags: Option<String>,
    app: tauri::AppHandle,
) -> Result<i64, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let result = db
        .execute(
            "INSERT INTO projects (name, color, icon, tags) VALUES (?, ?, ?, ?)",
            &[&name, &color, &icon, &tags.unwrap_or_default()],
        )
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(result.last_insert_id)
}

#[tauri::command]
pub async fn get_projects(
    include_archived: bool,
    app: tauri::AppHandle,
) -> Result<Vec<Project>, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let query = if include_archived {
        "SELECT * FROM projects ORDER BY created_at DESC"
    } else {
        "SELECT * FROM projects WHERE archived = 0 ORDER BY created_at DESC"
    };
    
    let projects: Vec<Project> = db
        .select(query)
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(projects)
}

#[tauri::command]
pub async fn update_project(
    id: i64,
    name: String,
    color: String,
    icon: String,
    tags: Option<String>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    db.execute(
        "UPDATE projects SET name = ?, color = ?, icon = ?, tags = ? WHERE id = ?",
        &[&name, &color, &icon, &tags.unwrap_or_default(), &id.to_string()],
    )
    .await
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn archive_project(
    id: i64,
    archived: bool,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    db.execute(
        "UPDATE projects SET archived = ? WHERE id = ?",
        &[&(archived as i64).to_string(), &id.to_string()],
    )
    .await
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn delete_project(id: i64, app: tauri::AppHandle) -> Result<(), String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    db.execute("DELETE FROM projects WHERE id = ?", &[&id.to_string()])
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(())
}

// ============================================================================
// SESSION COMMANDS
// ============================================================================

#[tauri::command]
pub async fn start_session(
    project_id: i64,
    is_pomodoro: bool,
    app: tauri::AppHandle,
) -> Result<i64, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let now = chrono::Utc::now().to_rfc3339();
    
    let result = db
        .execute(
            "INSERT INTO sessions (project_id, start_time, is_pomodoro) VALUES (?, ?, ?)",
            &[&project_id.to_string(), &now, &(is_pomodoro as i64).to_string()],
        )
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(result.last_insert_id)
}

#[tauri::command]
pub async fn stop_session(
    session_id: i64,
    duration_seconds: i64,
    notes: Option<String>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let now = chrono::Utc::now().to_rfc3339();
    
    db.execute(
        "UPDATE sessions SET end_time = ?, duration_seconds = ?, notes = ? WHERE id = ?",
        &[
            &now,
            &duration_seconds.to_string(),
            &notes.unwrap_or_default(),
            &session_id.to_string(),
        ],
    )
    .await
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn get_active_session(app: tauri::AppHandle) -> Result<Option<Session>, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let sessions: Vec<Session> = db
        .select("SELECT * FROM sessions WHERE end_time IS NULL ORDER BY start_time DESC LIMIT 1")
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(sessions.into_iter().next())
}

#[tauri::command]
pub async fn get_sessions(
    project_id: Option<i64>,
    start_date: Option<String>,
    end_date: Option<String>,
    limit: Option<i64>,
    app: tauri::AppHandle,
) -> Result<Vec<Session>, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let mut query = "SELECT * FROM sessions WHERE 1=1".to_string();
    let mut params: Vec<String> = vec![];
    
    if let Some(pid) = project_id {
        query.push_str(" AND project_id = ?");
        params.push(pid.to_string());
    }
    
    if let Some(start) = start_date {
        query.push_str(" AND start_time >= ?");
        params.push(start);
    }
    
    if let Some(end) = end_date {
        query.push_str(" AND start_time <= ?");
        params.push(end);
    }
    
    query.push_str(" ORDER BY start_time DESC");
    
    if let Some(lim) = limit {
        query.push_str(&format!(" LIMIT {}", lim));
    }
    
    let sessions: Vec<Session> = db
        .select(&query)
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(sessions)
}

#[tauri::command]
pub async fn update_session(
    session_id: i64,
    duration_seconds: i64,
    notes: Option<String>,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    db.execute(
        "UPDATE sessions SET duration_seconds = ?, notes = ? WHERE id = ?",
        &[
            &duration_seconds.to_string(),
            &notes.unwrap_or_default(),
            &session_id.to_string(),
        ],
    )
    .await
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn delete_session(session_id: i64, app: tauri::AppHandle) -> Result<(), String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    db.execute("DELETE FROM sessions WHERE id = ?", &[&session_id.to_string()])
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(())
}

// ============================================================================
// STATISTICS COMMANDS
// ============================================================================

#[tauri::command]
pub async fn get_daily_stats(
    start_date: String,
    end_date: String,
    app: tauri::AppHandle,
) -> Result<Vec<DailyStats>, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let stats: Vec<DailyStats> = db
        .select(
            "SELECT DATE(start_time) as date, 
                    SUM(duration_seconds) as total_seconds,
                    COUNT(*) as sessions_count
             FROM sessions 
             WHERE start_time >= ? AND start_time <= ?
             GROUP BY DATE(start_time)
             ORDER BY date",
        )
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(stats)
}

#[tauri::command]
pub async fn get_project_stats(
    start_date: String,
    end_date: String,
    app: tauri::AppHandle,
) -> Result<Vec<ProjectStats>, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let stats: Vec<ProjectStats> = db
        .select(
            "SELECT s.project_id, 
                    p.name as project_name,
                    SUM(s.duration_seconds) as total_seconds,
                    COUNT(*) as sessions_count
             FROM sessions s
             JOIN projects p ON s.project_id = p.id
             WHERE s.start_time >= ? AND s.start_time <= ?
             GROUP BY s.project_id, p.name
             ORDER BY total_seconds DESC",
        )
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(stats)
}

// ============================================================================
// POMODORO SETTINGS COMMANDS
// ============================================================================

#[tauri::command]
pub async fn get_pomodoro_settings(app: tauri::AppHandle) -> Result<PomodoroSettings, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let settings: Vec<PomodoroSettings> = db
        .select("SELECT * FROM pomodoro_settings WHERE id = 1")
        .await
        .map_err(|e| e.to_string())?;
    
    settings
        .into_iter()
        .next()
        .ok_or_else(|| "Pomodoro settings not found".to_string())
}

#[tauri::command]
pub async fn update_pomodoro_settings(
    work_duration: i64,
    short_break: i64,
    long_break: i64,
    cycles_before_long_break: i64,
    sound_enabled: bool,
    notifications_enabled: bool,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    db.execute(
        "UPDATE pomodoro_settings SET 
            work_duration = ?,
            short_break = ?,
            long_break = ?,
            cycles_before_long_break = ?,
            sound_enabled = ?,
            notifications_enabled = ?
         WHERE id = 1",
        &[
            &work_duration.to_string(),
            &short_break.to_string(),
            &long_break.to_string(),
            &cycles_before_long_break.to_string(),
            &(sound_enabled as i64).to_string(),
            &(notifications_enabled as i64).to_string(),
        ],
    )
    .await
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

// ============================================================================
// GOAL & STREAK COMMANDS
// ============================================================================

#[tauri::command]
pub async fn create_goal(
    project_id: Option<i64>,
    daily_target_seconds: i64,
    app: tauri::AppHandle,
) -> Result<i64, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let result = db
        .execute(
            "INSERT INTO goals (project_id, daily_target_seconds) VALUES (?, ?)",
            &[
                &project_id.map(|id| id.to_string()).unwrap_or_default(),
                &daily_target_seconds.to_string(),
            ],
        )
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(result.last_insert_id)
}

#[tauri::command]
pub async fn get_goals(app: tauri::AppHandle) -> Result<Vec<Goal>, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let goals: Vec<Goal> = db
        .select("SELECT * FROM goals ORDER BY created_at DESC")
        .await
        .map_err(|e| e.to_string())?;
    
    Ok(goals)
}

#[tauri::command]
pub async fn update_streak(
    date: String,
    total_seconds: i64,
    goal_met: bool,
    app: tauri::AppHandle,
) -> Result<(), String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    db.execute(
        "INSERT OR REPLACE INTO streaks (date, total_seconds, goal_met) VALUES (?, ?, ?)",
        &[
            &date,
            &total_seconds.to_string(),
            &(goal_met as i64).to_string(),
        ],
    )
    .await
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn get_current_streak(app: tauri::AppHandle) -> Result<i64, String> {
    let db = app.state::<tauri_plugin_sql::Db>();
    
    let streaks: Vec<Streak> = db
        .select("SELECT * FROM streaks WHERE goal_met = 1 ORDER BY date DESC")
        .await
        .map_err(|e| e.to_string())?;
    
    let mut streak = 0;
    let mut last_date: Option<chrono::NaiveDate> = None;
    
    for s in streaks {
        if let Ok(date) = chrono::NaiveDate::parse_from_str(&s.date, "%Y-%m-%d") {
            if let Some(prev_date) = last_date {
                let diff = prev_date.signed_duration_since(date).num_days();
                if diff == 1 {
                    streak += 1;
                    last_date = Some(date);
                } else {
                    break;
                }
            } else {
                streak = 1;
                last_date = Some(date);
            }
        }
    }
    
    Ok(streak)
}
