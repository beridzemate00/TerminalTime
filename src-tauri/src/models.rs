use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize)]
pub struct Project {
    pub id: Option<i64>,
    pub name: String,
    pub color: String,
    pub icon: String,
    pub tags: Option<String>, // JSON array as string
    pub archived: bool,
    pub created_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Session {
    pub id: Option<i64>,
    pub project_id: i64,
    pub start_time: String,
    pub end_time: Option<String>,
    pub duration_seconds: i64,
    pub notes: Option<String>,
    pub is_pomodoro: bool,
    pub created_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PomodoroSettings {
    pub id: i64,
    pub work_duration: i64,
    pub short_break: i64,
    pub long_break: i64,
    pub cycles_before_long_break: i64,
    pub sound_enabled: bool,
    pub notifications_enabled: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Goal {
    pub id: Option<i64>,
    pub project_id: Option<i64>,
    pub daily_target_seconds: i64,
    pub created_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Streak {
    pub id: Option<i64>,
    pub date: String,
    pub total_seconds: i64,
    pub goal_met: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DailyStats {
    pub date: String,
    pub total_seconds: i64,
    pub sessions_count: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectStats {
    pub project_id: i64,
    pub project_name: String,
    pub total_seconds: i64,
    pub sessions_count: i64,
}
