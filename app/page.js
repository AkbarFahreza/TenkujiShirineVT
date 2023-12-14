"use client";
import React, { useState } from "react";
import Image from "next/image";
import DropDown from "./components/home/DropDown";
import UpComingStream from "./components/UpcomingStream";
import DummyUpcoming from "./components/DummyUpcoming";
import Home from "./components/UpcomingStream";
function Page() {
  const [selectedOption, setSelectedOption] = useState({
    value: "nowStream",
    label: "Now Streaming",
  });

  const options = [
    { value: "upComingStream", label: "Scheduled" },
    { value: "nowStream", label: "Now Streaming" },
  ];

  const handleSelectChange = (value) => {
    setSelectedOption(options.find((option) => option.value === value));
  };

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
      <div className="mx-6 mt-4">
        <div className="flex flex-row justify-between">
          <DropDown
            options={options}
            selectedOption={selectedOption}
            onSelect={handleSelectChange}
          />
          <button href="/" className="py-1 px-2 mobile-subtitle-b text-white">
            More
          </button>
        </div>
        <div>
          {selectedOption.value === "nowStream" && (
            <p className="mt-2 text-blue-600">Hello Selection 2</p>
          )}
          {selectedOption.value === "upComingStream" && <Home />}
        </div>
      </div>
    </div>
  );
}

export default Page;
