import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import AdminUsersPage from '@/pages/AdminUsersPage';
import AdminProductsPage from '@/pages/AdminProductsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-milk-light font-sans text-primary-950">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
