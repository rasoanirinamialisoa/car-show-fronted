// components/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";
import { jwtDecode } from 'jwt-decode';

import { CustomButton } from "..";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";
import Avatar from "./AvatarProps";
import AuthContainer from "./AuthContainer";
import { ToastContainer } from "react-toastify";

const Nav = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState<User>();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedData = jwtDecode(token) as User;
          if (decodedData) {
            setUserLoggedIn(decodedData);
          }
        } catch (e) {
          console.log("Token Error: ", e)
        }
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAuth = () => {
    setIsAuthOpen(!isAuthOpen);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const logout = () => {
    setUserLoggedIn(undefined);
    localStorage.clear();
    router.push("/")
  }

  return (
    <>
      <header className={`w-full fixed z-10 transition-colors duration-300 ${scrolled ? "bg-gray-100 shadow" : ""}`} >
        <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 py-4">
          <Link href="/" className="flex justify-center items-center">
            <Image
              src="/icon/best.png"
              alt="awesome cars"
              width={118}
              height={18}
              className="object-contain"
            />
          </Link>
          <div className="flex flex-row justify-center">
            {userLoggedIn ? (
              <div className="flex flex-row justify-center">
                <div className={`p-4 rounded-l-md  ${scrolled ? "bg-gray-100" : "bg-white"}`} >
                  <Avatar userLoggedIn={userLoggedIn} scrolled={scrolled} />
                </div>
                <div className="w-full h-full flex items-center justify-center cursor-pointer rounded-r-md" >
                  <button className={`text-black hover:bg-gray-300  font-bold w-full h-full px-5 rounded-r-md ${scrolled ? "bg-gray-100" : "bg-white"}`} onClick={logout}>
                    <LuLogOut className="text-xl" />
                  </button>
                </div>
              </div>
            ) : (
              <div style={{display:"flex"}}>
                <button onClick={() => setCurrentPage('signIn')}>
                  <CustomButton
                    title="Signin"
                    btnType="button"
                    containerStyles={`text-purple-500 rounded-full  min-w-[130px] ${scrolled ? "bg-gray-100" : "bg-white"}`}
                    rightIcon=""
                    handleClick={toggleAuth}
                  />
                </button>
                <button onClick={() => setCurrentPage('signUp')}>
                  <CustomButton
                    title="Signup"
                    btnType="button"
                    containerStyles={`text-purple-500 rounded-full  min-w-[130px] ${scrolled ? "bg-gray-100" : "bg-white"}`}
                    rightIcon=""
                    handleClick={toggleAuth}
                  />
                </button>
                <button onClick={() => setCurrentPage('contact')}>
                  <CustomButton
                    title="Contact-us"
                    btnType="button"
                    containerStyles={`text-purple-500 rounded-full  min-w-[130px] ${scrolled ? "bg-gray-100" : "bg-white"}`}
                    rightIcon=""
                    handleClick={toggleAuth}
                  />
                </button>
              </div>
            )}
          </div>
        </nav>
        <AuthContainer
          isAuthOpen={isAuthOpen}
          closeAuth={closeAuth}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          userLoggedIn={userLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
        />
      </header>
      <ToastContainer />
    </>
  );
};

export default Nav;
