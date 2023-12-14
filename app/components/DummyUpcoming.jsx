import Image from "next/image";
import React from "react";

function DummyUpcoming() {
  return (
    <div className="text-white mt-4">
      <ul className=" flex flex-row overflow-auto shrink-0 space-x-4">
        <li key="1234" className="min-w-[60vw] h-auto">
          <div className="relative rounded-md overflow-hidden border-2 border-white">
            <Image
              width={500}
              height={281}
              src="/tamnel.png"
              className="w-full h-auto"
            />
            <span className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-black to-black/0"></span>
          </div>
          <div className="mt-3">
            <strong className="mobile-title-b">
              Pergi Ke pasar membeli buah, anjayy apakabr sayang
              oakwokawasawdaiw awndaiwh
            </strong>
          </div>
          {/* <p>Channel: {stream.channelId}</p> */}
          {/* <p>Scheduled Time: {stream.scheduledTime}</p> */}
          {/* <p>Video ID: {stream.videoId}</p> */}
        </li>
      </ul>
    </div>
  );
}

export default DummyUpcoming;
