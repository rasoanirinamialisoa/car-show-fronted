"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CustomButton } from "..";
import Link from "next/link";
import { Navbar } from "@/app/components";

const Hero = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setUser(token);
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="hero__title">
            Your dream car is with us!
          </h1>
          <p className="hero__subtitle">
            Increase your savings and streamline your car-buying experience with our online platform.
          </p>
          <div className="flex flex-row gap-5">
            <Link href="/cars" className="">
              <CustomButton
                title="Explore cars"
                containerStyles="bg-purple-500 text-white rounded-full mt-10 transition-all duration-300 hover:text-black hover:bg-light-blue"
                rightIcon={""}
              />
            </Link>
            {user && (
              <Link href="/customer" className="">
                <CustomButton
                  title="My Carts"
                  containerStyles="bg-purple-500 text-white rounded-full mt-10 transition-all duration-300 hover:text-black hover:bg-light-blue"
                  rightIcon={""}
                />
              </Link>
            )}
          </div>
        </div>
        <div className="hero__image-container">
          <div className="hero__image">
            <Image src="/illustration/hero.png" alt="hero" fill className="object-contain" />
            <div className="hero__image-overlay" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
