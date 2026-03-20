import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminUsers from '@/components/AdminUsers';

const AdminUsersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AdminUsers />
      </main>
      <Footer />
    </div>
  );
};

export default AdminUsersPage;
