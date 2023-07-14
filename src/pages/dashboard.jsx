import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/API/useAuth';

export const Dashboard = () => {
  const { auth, authUser } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    authUser();

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const currentHour = currentTime.getHours();

    if (currentHour >= 6 && currentHour <= 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour <= 19) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, [currentTime]);

  return (
    <div className="flex flex-col w-full h-[92vh] justify-between text-2xl text-red-600 font-extrabold">
      <h1>{greeting}, {auth?.User}</h1>
      <div className="">
        <h1>CV. Gemilang Multi Kreasi</h1>
        <h2>Jl. Berbek Industri III No. 15 Sidoarjo</h2>
        <h2>+62-318-494-605</h2>
      </div>
    </div>
  );
};
