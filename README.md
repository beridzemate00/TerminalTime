# TerminalTime ⏱️

A powerful, lightweight desktop productivity app for tracking time, staying focused with Pomodoro, and generating professional reports.

![TerminalTime](https://img.shields.io/badge/Tauri-2.0-blue) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![SQLite](https://img.shields.io/badge/SQLite-3-green) ![Status](https://img.shields.io/badge/Status-95%25%20Complete-success)

> **🎉 Latest Update**: All core features completed! Sessions, Stats, Focus, and Settings pages are now fully implemented.

## ✨ Features

### 🎯 Core Features (✅ Complete)
- **Project Management**: Create, edit, and organize projects with custom colors and icons
- **Time Tracking**: Start/pause/stop timers with automatic session saving
- **Pomodoro Timer**: Circular timer with configurable focus sessions and break reminders
- **Session History**: View, filter, and manage all your time sessions with notes
- **Statistics Dashboard**: Daily/weekly charts, productivity insights, and project breakdowns
- **Settings Panel**: Configure appearance, notifications, goals, and preferences

### 🚀 Advanced Features
- **Idle Detection**: Automatically detect and handle idle time
- **Quick Switcher** (Ctrl+K): Fast project switching
- **System Tray**: Run in background with quick controls
- **Goals & Streaks**: Set daily goals and track your productivity streaks
- **Backup/Restore**: Export and import your entire database
- **Dark Mode**: Beautiful dark theme support

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Backend**: Rust (Tauri 2.0)
- **Database**: SQLite
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

#### Linux (Kali/Debian/Ubuntu)
```bash
# Install system dependencies
sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustup default stable
```

#### macOS
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### Windows
1. Install [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. Install [Rust](https://www.rust-lang.org/tools/install)
3. Install [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

### Build from Source

```bash
# Clone the repository
git clone https://github.com/yourusername/terminaltime.git
cd terminaltime

# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## 🎮 Usage

### Starting a Timer
1. Create a project from the Dashboard
2. Click "Start" on any project
3. Timer runs in the background
4. Click "Stop" when done

### Pomodoro Mode
1. Go to Focus page
2. Link to a project (optional)
3. Click "Start Pomodoro"
4. Work for 25 minutes
5. Take a 5-minute break
6. Repeat!

### Generating Reports
1. Go to Sessions page
2. Select date range
3. Choose projects to include
4. Click "Export CSV" or "Export PDF"

## 📁 Project Structure

```
terminaltime/
├── src/                      # React frontend
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── timer/           # Timer components
│   │   ├── projects/        # Project components
│   │   ├── stats/           # Statistics components
│   │   └── pomodoro/        # Pomodoro components
│   ├── pages/               # Page components
│   ├── stores/              # Zustand state stores
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and API
│   └── types.ts             # TypeScript types
├── src-tauri/               # Rust backend
│   ├── src/
│   │   ├── main.rs          # Entry point
│   │   ├── lib.rs           # App setup
│   │   ├── commands.rs      # Tauri commands
│   │   ├── db.rs            # Database migrations
│   │   └── models.rs        # Data models
│   └── Cargo.toml           # Rust dependencies
└── package.json             # Node dependencies
```

## 🗄️ Database Schema

The app uses SQLite with the following tables:
- `projects` - Project information
- `sessions` - Time tracking sessions
- `pomodoro_settings` - Pomodoro configuration
- `goals` - Daily productivity goals
- `streaks` - Streak tracking

## 🎨 Customization

### Changing Pomodoro Durations
Go to Settings → Pomodoro and adjust:
- Work duration (default: 25 minutes)
- Short break (default: 5 minutes)
- Long break (default: 15 minutes)
- Cycles before long break (default: 4)

### Project Colors & Icons
When creating/editing a project:
- Choose from preset colors or enter a custom hex code
- Select an emoji icon or use any Unicode character

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Tauri](https://tauri.app/)
- UI inspired by modern productivity apps
- Icons by [Lucide](https://lucide.dev/)

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/terminaltime](https://github.com/yourusername/terminaltime)

---

**Made with ❤️ for productivity enthusiasts**
