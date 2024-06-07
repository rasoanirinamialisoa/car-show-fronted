"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload, User } from '@/app/types';
import Modal from '../components/Modal';
import Login from '../components/auth/loginadmin/Login';

const AdminPage = () => {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState<User | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined' && router) {
      const token = Cookies.get('admin_token');
      const user = token ? jwtDecode<JwtPayload>(token) : null;
    }
  }, [router]);

  const handleCloseModal = () => {
    setShowLoginModal(false);
    router.push('/');
  };

  const handleLoginSuccess = (user: User) => {
    setUserLoggedIn(user);
    setShowLoginModal(false);

  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md mx-auto p-8 border border-gray-300 rounded-lg">
        <p>You must be logged in as an administrator to access this page.</p>
        <p>
          If you don't have an account, please{' '}
          <button
            className="text-purple-600 font-bold"
            onClick={() => setShowLoginModal(true)}
          >
            log in here
          </button>.
        </p>
      </div>
      <Modal show={showLoginModal} onClose={handleCloseModal}>
        <Login
          onClose={handleCloseModal}
          setUserLoggedIn={setUserLoggedIn}
          setCurrentPage={() => { }}
        />
      </Modal>
    </div>
  );
};

export default AdminPage;

