import React from "react";
import Image from "next/image";
import Link from "next/link";
function Talent() {
  return (
    <div className="mx-6 lg:mx-24 mt-10 flex flex-col">
      <div className=" relative">
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold absolute right-0 top-1/2 -translate-y-1/2 text-secondary">
            Talents
          </h1>
          <span
            id="redLine1"
            className="h-1 absolute left-0 bg-secondary"
          ></span>
        </div>
      </div>
      <div className="mt-10 flex flex-row whitespace-nowrap overflow-auto gap-4">
        <div className="bg-third rounded-md w-[250px] h-[300px] flex flex-col shrink-0 justify-center ">
          <div className="mx-auto">
            <Image
              src="/TalentsPict/IttoShikabane.png"
              width={110}
              height={110}
              alt="Itto Shikabane"
              className=" rounded-full bg-white mx-auto"
            />
            <div className="mt-6 flex flex-col justify-center">
              <p className="text-white font-bold text-xl text-center">
                Itto Shikabane
              </p>
              <div className="w-full mt-3 flex flex-row gap-2 justify-center mx-auto">
                <button
                  href="https://dekreza.site"
                  className="bg-third hover:bg-secondary/30 border-2 w-fit border-white transition-all duration-200 hover:border-secondary rounded-full py-3 px-5"
                >
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 70 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M35.8562 0C37.7254 0.0105007 42.4017 0.0560033 47.372 0.255516L49.1361 0.33252C54.1379 0.567035 59.1362 0.97306 61.6179 1.6626C64.9256 2.59366 67.5227 5.30283 68.4013 8.74005C69.8014 14.2004 69.9764 24.8481 69.9974 27.4277L70.0009 27.9597V28.5688C69.9764 31.1484 69.8014 41.7996 68.4013 47.2564C67.5122 50.7042 64.9116 53.4168 61.6179 54.3339C59.1362 55.0234 54.1379 55.4295 49.1361 55.664L47.372 55.7445C42.4017 55.9405 37.7254 55.9895 35.8562 55.9965L35.0337 56H34.1411C30.1859 55.9755 13.6439 55.797 8.37952 54.3339C5.07532 53.4028 2.47466 50.6937 1.5961 47.2564C0.196013 41.7961 0.0210013 31.1484 0 28.5688V27.4277C0.0210013 24.8481 0.196013 14.1969 1.5961 8.74005C2.48516 5.29233 5.08582 2.57966 8.38302 1.6661C13.6439 0.199512 30.1894 0.0210013 34.1446 0H35.8562ZM27.9982 15.751V40.2525L48.9996 28.0017L27.9982 15.751Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button
                  href="https://dekreza.site"
                  className="bg-third hover:bg-secondary/30 border-2 w-fit border-white transition-all duration-200 hover:border-secondary rounded-full py-3 px-5"
                >
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 55 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.376 23.712L52.628 0H47.828L30.248 20.588L16.2 0H0L21.24 31.136L0 56H4.8L23.368 34.256L38.204 56H54.404L32.376 23.712ZM25.804 31.408L23.652 28.308L6.528 3.64H13.9L27.716 23.548L29.868 26.648L47.832 52.528H40.46L25.804 31.408Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <button className="text-center bg-secondary rounded-full py-2 px-3 font-bold text-white mt-3 hover:bg-secondary/50 transition-all duration-200">
                Trakteer
              </button>
            </div>
          </div>
        </div>
        <div className="bg-third rounded-md w-[250px] h-[300px]  shrink-0 flex flex-col justify-center ">
          <div className="mx-[20px] font-bold text-white text-center">
            Aku ga tau ada siapa aja
          </div>
        </div>
      </div>
    </div>
  );
}

export default Talent;
