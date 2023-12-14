import React from "react";
import Image from "next/image";
function Profile() {
  return (
    <div className="mx-6 lg:mx-24 mt-5 flex flex-col">
      <div className=" relative">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold text-secondary">Profile</h1>
          <span
            id="redLine"
            className="h-1 absolute right-0 bg-secondary"
          ></span>
        </div>
      </div>
      <div className="mt-3 flex flex-col lg:flex-row items-center lg:gap-5">
        <Image
          src="/Logo_Tenkuji.png"
          width={500}
          height={500}
          className="lg:scale-75 origin-left"
        />
        <div className="">
          <p className="text-white">
            Introducing <strong>TENKUJI SHRINE</strong> a captivating{" "}
            <strong>VTuber group</strong> deeply rooted in ancient Japanese
            traditions. This diverse ensemble of 10 talents, each inspired by
            mythical creatures and will transports you to a realm where
            old-world charm meets modern-day entertainment.
          </p>
          <p className="text-white mt-4">
            <strong>TENKUJI SHRINE</strong> presence isn't limited to YouTube
            alone, you can find them enchanting audiences on{" "}
            <span className="text-secondary">
              Twitter, TikTok, Instagram, and Discord
            </span>
            , where they engage with their fans, share behind-the-scenes
            moments, and build a vibrant community that bridges the gap between
            old Japanese concepts and modern content creation
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
