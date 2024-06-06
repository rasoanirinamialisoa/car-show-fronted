// components/AuthContainer.tsx
"use client";

import React from 'react';
import { Auth } from '..';
import { User } from '@/app/types';

interface AuthContainerProps {
  isAuthOpen: boolean;
  closeAuth: () => void;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  userLoggedIn: User | undefined;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ isAuthOpen, closeAuth, currentPage, setCurrentPage, userLoggedIn, setUserLoggedIn }) => {
  return (
    <>
      {isAuthOpen && (
        <Auth
          isOpen={true}
          onClose={closeAuth}
          currentPage={currentPage}
          userLoggedIn={userLoggedIn}
          setCurrentPage={setCurrentPage}
          setUserLoggedIn={setUserLoggedIn}
        />
      )}
    </>
  );
};

export default AuthContainer;
