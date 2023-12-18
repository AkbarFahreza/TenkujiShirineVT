"use client";
import React, { useEffect, useState } from "react";

const YouTubeLiveStreams = ({ apiKey, channelIds }) => {
  const [upcomingStreams, setUpcomingStreams] = useState([]);
  const cacheKey = "youtubeLiveStreams";

  useEffect(() => {
    const fetchUpcomingStreams = async () => {
      try {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);

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

        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: flattenedStreams, timestamp: Date.now() })
        );

        setUpcomingStreams(flattenedStreams);
        console.log(flattenedStreams);
      } catch (error) {
        console.error("Error fetching upcoming streams:", error);
      }
    };

    fetchUpcomingStreams();
  }, [apiKey, channelIds]);

  const formatDate = (rawScheduledTime) => {
    const date = new Date(rawScheduledTime);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

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
    <div>
      <div className="text-white">
        <ul className="flex flex-row overflow-auto gap-2">
          {upcomingStreams.map((stream) => (
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
};

const Home = () => {
  return (
    <div>
      <YouTubeLiveStreams
        apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}
        channelIds={[
          process.env.NEXT_PUBLIC_CHANNEL_ID_1,
          process.env.NEXT_PUBLIC_CHANNEL_ID_2,
        ]}
      />
    </div>
  );
};

export default Home;
