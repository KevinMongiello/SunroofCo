import { Routes, Route } from 'react-router-dom';
import { UsersPage } from './pages/UsersPage';
import { UserFormPage } from './pages/UserFormPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/new" element={<UserFormPage />} />
      <Route path="/users/:id/edit" element={<UserFormPage />} />
    </Routes>
  );
}

export default App;