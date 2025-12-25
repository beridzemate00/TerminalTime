import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Sessions } from './pages/Sessions';
import { Stats } from './pages/Stats';
import { Focus } from './pages/Focus';
import { Settings } from './pages/Settings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
