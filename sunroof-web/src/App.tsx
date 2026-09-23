import { Routes, Route } from 'react-router-dom';
import { UsersPage } from './pages/UsersPage';
import { UserFormPage } from './pages/UserFormPage';
import { AppLayout } from './pages/AppLayout';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/new" element={<UserFormPage />} />
        <Route path="/users/:id/edit" element={<UserFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;