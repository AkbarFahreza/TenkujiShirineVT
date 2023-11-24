"use client";
import React, { useEffect, useState } from "react";

const YouTubeLiveStreams = ({ apiKey, channelIds }) => {
  const [upcomingStreams, setUpcomingStreams] = useState([]);

  useEffect(() => {
    const fetchUpcomingStreams = async () => {
      try {
        const promises = channelIds.map(async (channelId) => {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=upcoming&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(`Error fetching data for channel ${channelId}`);
          }

          const data = await response.json();

          const streams = data.items.map((item) => ({
            title: item.snippet.title,
            scheduledTime: item.snippet.publishedAt,
            videoId: item.id.videoId,
          }));

          return { channelId, streams };
        });

        const streamsForAllChannels = await Promise.all(promises);

        // Organize the streams into an object with channel IDs as keys
        const streamsByChannel = {};
        streamsForAllChannels.forEach(({ channelId, streams }) => {
          streamsByChannel[channelId] = streams;
        });

        setUpcomingStreams(streamsByChannel);
      } catch (error) {
        console.error("Error fetching upcoming streams:", error);
      }
    };

    fetchUpcomingStreams();
  }, [apiKey, channelIds]);
  console.log(upcomingStreams);
  return (
    <div>
      <h2>Upcoming Live Streams</h2>
      <div className="flex flex-row justify-between">
        {Object.keys(upcomingStreams).map((channelId) => (
          <div key={channelId}>
            <h3>Channel: {channelId}</h3>
            <ul>
              {upcomingStreams[channelId].map((stream) => (
                <li key={stream.videoId}>
                  <strong>{stream.title}</strong>
                  <p>Scheduled Time: {stream.scheduledTime}</p>
                  <p>Video ID: {stream.videoId}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
