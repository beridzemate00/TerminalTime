---
description: Development workflow and commands for TerminalTime
---

# TerminalTime Development Guide

## 🚀 Quick Start

### First Time Setup
```bash
# 1. Install system dependencies (Kali Linux)
sudo apt install -y libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev

# 2. Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustup default stable

# 3. Install Node dependencies
npm install

# 4. Run the app
npm run tauri dev
```

## 📝 Development Commands

### Frontend Development
```bash
# Run Vite dev server only (for UI development)
npm run dev

# Build frontend for production
npm run build

# Preview production build
npm run preview
```

### Tauri Development
```bash
# Run Tauri app in development mode (hot reload)
npm run tauri dev

# Build production executable
npm run tauri build

# Build for specific platform
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

### Database Management
The database is automatically created and migrated on first run.
Location: `~/.local/share/com.terminaltime.app/terminaltime.db`

To reset the database:
```bash
rm ~/.local/share/com.terminaltime.app/terminaltime.db
```

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Components**: Reusable UI components in `src/components/`
- **Pages**: Full page components in `src/pages/`
- **Stores**: Zustand state management in `src/stores/`
- **API**: Tauri command wrappers in `src/lib/api.ts`
- **Types**: TypeScript definitions in `src/types.ts`

### Backend (Rust + Tauri)
- **Commands**: Tauri commands in `src-tauri/src/commands.rs`
- **Database**: SQLite migrations in `src-tauri/src/db.rs`
- **Models**: Data structures in `src-tauri/src/models.rs`
- **Main**: App initialization in `src-tauri/src/lib.rs`

## 🔧 Adding New Features

### Adding a New Tauri Command

1. **Define the command in Rust** (`src-tauri/src/commands.rs`):
```rust
#[tauri::command]
pub async fn my_new_command(
    param: String,
    app: tauri::AppHandle,
) -> Result<String, String> {
    // Your logic here
    Ok("Success".to_string())
}
```

2. **Register the command** (`src-tauri/src/lib.rs`):
```rust
.invoke_handler(tauri::generate_handler![
    // ... existing commands
    my_new_command,
])
```

3. **Add TypeScript wrapper** (`src/lib/api.ts`):
```typescript
export const myApi = {
  newCommand: async (param: string): Promise<string> => {
    return await invoke('my_new_command', { param });
  },
};
```

### Adding a New Page

1. **Create page component** (`src/pages/MyPage.tsx`):
```typescript
import React from 'react';

export const MyPage: React.FC = () => {
  return <div>My New Page</div>;
};
```

2. **Add routing** (when we implement React Router)

### Adding a New Store

1. **Create store** (`src/stores/myStore.ts`):
```typescript
import { create } from 'zustand';

interface MyStore {
  value: string;
  setValue: (val: string) => void;
}

export const useMyStore = create<MyStore>((set) => ({
  value: '',
  setValue: (val) => set({ value: val }),
}));
```

## 🎨 Styling Guidelines

### TailwindCSS Classes
- Use utility classes from `src/App.css`
- Custom components: `.btn`, `.card`, `.glass`, etc.
- Dark mode: Use `dark:` prefix

### Color Palette
- Primary: `primary-{50-900}` (Indigo)
- Success: `emerald-{50-900}`
- Warning: `amber-{50-900}`
- Danger: `red-{50-900}`
- Neutral: `slate-{50-900}`

### Component Patterns
```typescript
// Always use TypeScript
// Always define prop interfaces
// Use functional components with hooks
// Extract reusable logic to custom hooks

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

## 🐛 Debugging

### Frontend Debugging
- Open DevTools in the Tauri window: Right-click → Inspect
- Console logs appear in DevTools
- React DevTools extension works

### Backend Debugging
- Rust logs appear in the terminal running `npm run tauri dev`
- Use `println!()` or `dbg!()` for debugging
- Check Tauri logs: `~/.local/share/com.terminaltime.app/logs/`

### Database Debugging
```bash
# Open database with SQLite CLI
sqlite3 ~/.local/share/com.terminaltime.app/terminaltime.db

# List tables
.tables

# View table schema
.schema projects

# Query data
SELECT * FROM projects;
```

## 📦 Building for Production

### Linux (AppImage)
```bash
npm run tauri build
# Output: src-tauri/target/release/bundle/appimage/
```

### Linux (.deb package)
```bash
npm run tauri build -- --bundles deb
# Output: src-tauri/target/release/bundle/deb/
```

### Cross-platform builds
Requires additional setup. See [Tauri documentation](https://tauri.app/v1/guides/building/cross-platform).

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create a project
- [ ] Start a timer
- [ ] Pause and resume timer
- [ ] Stop timer and verify session saved
- [ ] Edit session notes
- [ ] Delete a session
- [ ] Start Pomodoro
- [ ] Complete Pomodoro cycle
- [ ] View statistics
- [ ] Export CSV
- [ ] Set a goal
- [ ] Check streak calculation

## 🚀 Performance Tips

1. **Auto-save**: Timer auto-saves every 5 seconds
2. **Debounce**: User inputs are debounced
3. **Lazy loading**: Large lists use pagination
4. **Memoization**: Use `useMemo` and `useCallback` for expensive operations

## 📚 Useful Resources

- [Tauri Documentation](https://tauri.app/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Use Prettier (if configured)
- **Linting**: Follow ESLint rules
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Document complex logic

---

Happy coding! 🎉
