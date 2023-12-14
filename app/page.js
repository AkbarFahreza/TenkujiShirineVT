"use client";
import React, { useState } from "react";
import Image from "next/image";
import YouTubeLiveStreams from "./components/Sections/UpcomingStream";
import Profile from "./components/Sections/Profile";
import Talent from "./components/Sections/Talent";
function Page() {
  return (
    <div>
      <div className="w-full xl:min-h-screen relative min-h-[100px] bg-secondary">
        <Image
          width={500}
          height={231}
          alt="banner"
          src="/banner.svg"
          className="m-auto lg:min-h-[90vh] lg:w-full"
        />
        <div className="absolute top-1/2  w-[50%] -left-3 -translate-y-1/2">
          <div className="flex flex-col justify-center">
            <Image
              width={500}
              height={331}
              alt="logo type"
              src="/TS-Type-logo.png"
              className=" w-[50%] h-auto mx-auto"
            />
            <button className="py-3 text-3xl hidden lg:flex font-bold mx-auto px-5 rounded-full -mb-10 bg-main">
              Join Discord
            </button>
          </div>
        </div>
      </div>
      <div className="mx-6 lg:mx-24 mt-4">
        <div className="flex flex-row justify-between">
          <h1 className="text-white font-bold">Stream Schedule</h1>
          <button
            href="/"
            className="py-1 px-3 mobile-subtitle-b transition-all duration-200 hover:bg-secondary/60 border-secondary rounded-full border-2 text-white"
          >
            More
          </button>
        </div>
        <div>
          <div>
            <YouTubeLiveStreams
              apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}
              channelIds={[
                process.env.NEXT_PUBLIC_CHANNEL_ID_1,
                process.env.NEXT_PUBLIC_CHANNEL_ID_2,
              ]}
            />
          </div>
        </div>
      </div>
      <Profile />
      <Talent />
    </div>
  );
}

export default Page;
