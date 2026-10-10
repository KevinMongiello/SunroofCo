import { Routes, Route } from 'react-router-dom';
import { UsersPage } from './pages/UsersPage';
import { UserFormPage } from './pages/UserFormPage';
import { AppLayout } from './pages/AppLayout/AppLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { TimecardsPage } from './pages/TimecardsPage';
import { TimecardFormPage } from './pages/TimecardFormPage';
import { ReportsPage } from './pages/ReportsPage/ReportsPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/new" element={<UserFormPage />} />
        <Route path="/users/:id/edit" element={<UserFormPage />} />
        <Route path="/timecards" element={<TimecardsPage />} />
        <Route path="/timecards/new" element={<TimecardFormPage />} />
        <Route path="/timecards/:id/edit" element={<TimecardFormPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}

export default App;