"use client";
import { useEffect, useState } from "react";
import { getYoutubeData } from "@/api/getYoutubeData";
export default function ScheduleStream() {
  const [scheduleStream, setScheduleStream] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getYoutubeData();
      setScheduleStream(data);
    };
    fetchData();
  }, []);

  const formatDate = (rawScheduledTime) => {
    const date = new Date(rawScheduledTime);

    if (!isValidDate(date)) {
      return "Invalid Date";
    }

    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatTime = (rawScheduledTime) => {
    const date = new Date(rawScheduledTime);

    if (!isValidDate(date)) {
      return "Invalid Date";
    }

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime()) && isFinite(date);
  };
  console.log(scheduleStream);
  return (
    <div>
      <div className="text-white">
        <ul className="flex flex-row overflow-auto gap-2">
          {scheduleStream &&
            scheduleStream.map((stream) => (
              <li key={stream.videoId} className="min-w-[90%] h-auto">
                <img
                  src={stream.thumbnail}
                  alt={`Thumbnail for ${stream.title}`}
                />
                <h1 className="font-bold whitespace-normal text-sm">
                  {stream.title}
                </h1>
                <p>Date: {formatDate(stream.scheduledTime)}</p>
                <p>Time: {formatTime(stream.scheduledTime)}</p>
                <p>Channel: {stream.channelName}</p>
                {stream.channelAvatar && (
                  <img
                    src={stream.channelAvatar}
                    alt={`Avatar for ${stream.channelName}`}
                  />
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
