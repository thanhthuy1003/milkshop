import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminProducts from '@/components/AdminProducts';

const AdminProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AdminProducts />
      </main>
      <Footer />
    </div>
  );
};

export default AdminProductsPage;
