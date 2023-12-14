"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// ... (previous imports)

const YouTubeLiveStreams = ({ apiKey, channelIds }) => {
  const [upcomingStreams, setUpcomingStreams] = useState([]);
  const cacheKey = "youtubeLiveStreams";

  useEffect(() => {
    const fetchUpcomingStreams = async () => {
      try {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // Check if the cached data is less than 1 hour old
          if (Date.now() - timestamp < 3600000) {
            setUpcomingStreams(data);
            return;
          }
        }

        const promises = channelIds.map(async (channelId) => {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=upcoming&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(`Error fetching data for channel ${channelId}`);
          }

          const data = await response.json();

          const streams = await Promise.all(
            data.items.map(async (item) => {
              const videoId = item.id.videoId;
              const videoDetailsResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
              );

              if (!videoDetailsResponse.ok) {
                throw new Error(
                  `Error fetching video details for videoId ${videoId}`
                );
              }

              const videoDetails = await videoDetailsResponse.json();
              const thumbnail =
                videoDetails.items[0]?.snippet?.thumbnails?.high?.url ||
                videoDetails.items[0]?.snippet?.thumbnails?.default?.url ||
                "";

              // Fetch channel information
              const channelResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`
              );

              const channelData = await channelResponse.json();
              const channelName =
                channelData?.items[0]?.snippet?.title || "Unknown Channel";
              const channelAvatar =
                channelData?.items[0]?.snippet?.thumbnails?.default?.url || "";
              console.log(channelData);
              return {
                title: item.snippet.title,
                scheduledTime: item.snippet.publishedAt,
                videoId: videoId,
                channelId: item.snippet.channelId,
                thumbnail: thumbnail,
                channelName: channelName,
                channelAvatar: channelAvatar,
              };
            })
          );

          return streams;
        });

        const allStreams = await Promise.all(promises);
        const flattenedStreams = allStreams.flat();

        // Save data to localStorage
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: flattenedStreams, timestamp: Date.now() })
        );

        setUpcomingStreams(flattenedStreams);
      } catch (error) {
        console.error("Error fetching upcoming streams:", error);
      }
    };

    fetchUpcomingStreams();
  }, [apiKey, channelIds]);

  // console.log(upcomingStreams);

  // Function to format UTC time into "DD MMM YYYY"
  const formatDate = (rawScheduledTime) => {
    const date = new Date(rawScheduledTime);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Function to format UTC time into "h:mm A"
  const formatTime = (rawScheduledTime) => {
    const date = new Date(rawScheduledTime);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="mt-4">
      <div className="text-white">
        <div className="flex flex-row overflow-auto gap-4">
          {upcomingStreams.map((stream) => (
            <Link
              key={stream.videoId}
              href={`https://www.youtube.com/watch?v=${stream.videoId}`}
              className="lg:w-1/3 relative scale-95 hover:scale-100 transition-all duration-200 cursor-pointer"
            >
              <div className="relative hover:border-secondary transition-all duration-200 border-2 rounded-md overflow-hidden ">
                <img
                  id="thumbnail-img"
                  src={stream.thumbnail}
                  alt={`Thumbnail for ${stream.title}`}
                  className=" relative min-w-[300px] "
                />
                <span id="filter" className=""></span>

                <div className="flex flex-row align-middle items-center absolute bottom-3 mx-3">
                  <div>
                    {stream.channelAvatar && (
                      <img
                        id="channelAvetar"
                        src={stream.channelAvatar}
                        alt={`Avatar for ${stream.channelName}`}
                        className="rounded-full min-w-[40px] max-w-[40px] h-auto "
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="font-poppins font-bold text-md whitespace-nowrap text-secondary max-w-[220px] overflow-hidden overflow-ellipsis">
                      {stream.channelName}
                    </p>
                    <p className="font-bold text-xs">
                      {formatDate(stream.scheduledTime)}
                    </p>
                    <p className="font-bold text-xs">
                      {formatTime(stream.scheduledTime)}
                    </p>
                  </div>
                </div>
              </div>

              <h1 className="font-bold whitespace-normal text-md mt-4">
                {stream.title}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// ... (remaining code)

export default YouTubeLiveStreams;
