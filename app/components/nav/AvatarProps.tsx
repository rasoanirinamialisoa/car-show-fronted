// components/Avatar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RxAvatar } from 'react-icons/rx';
import { toast } from 'react-toastify';
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { User } from '@/app/types';

interface AvatarProps {
  userLoggedIn: User | undefined;
  scrolled: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userLoggedIn, scrolled }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [progress, setProgress] = useState(false);

  const getAvatar = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`${SERVER_API_URL}/avatar/getAvatarById/${userId}`, {
        responseType: 'blob',
      });
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        setAvatar(url);
      }
    } catch (e) {
      setAvatar(null);
    }
  }

  const handleChange = async (e: any) => {
    setProgress(true);
    try {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      const response = await axiosInstance.patch(
        `${SERVER_API_URL}/avatar/update/${userLoggedIn?.sub}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (response.status === 200) {
        if (userLoggedIn)
          getAvatar(userLoggedIn.sub);
        toast.success("Profile image successfully changed.", {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (e: any) {
      if (e.response.status === 404) {
        setAvatar(null);
      }
    }
    setProgress(false);
  };

  useEffect(() => {
    if (userLoggedIn) {
      getAvatar(userLoggedIn.sub);
    }
  }, [userLoggedIn]);

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="bg-gray-300 text-white overflow-hidden rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-600">
        <label htmlFor="avatarInput">
          {avatar && (
            <Image src={avatar} alt="Avatar" width={50} height={50} className="cursor-pointer" />
          )}
          {!avatar && (
            <RxAvatar />
          )}
          <input id="avatarInput" accept="image/*" hidden type="file" onChange={handleChange} />
        </label>
      </div>
      <div>
        <div className="font-semibold">{userLoggedIn?.fullName}</div>
        <div className="text-gray-600">{userLoggedIn?.email}</div>
      </div>
    </div>
  );
};

export default Avatar;
