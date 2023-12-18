export async function getYoutubeData() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const channelIds = [
      process.env.NEXT_PUBLIC_CHANNEL_ID_1,
      process.env.NEXT_PUBLIC_CHANNEL_ID_2,
      process.env.NEXT_PUBLIC_CHANNEL_ID_3,
      process.env.NEXT_PUBLIC_CHANNEL_ID_4,
      process.env.NEXT_PUBLIC_CHANNEL_ID_5,
      process.env.NEXT_PUBLIC_CHANNEL_ID_6,
      process.env.NEXT_PUBLIC_CHANNEL_ID_7,
      process.env.NEXT_PUBLIC_CHANNEL_ID_8,
      process.env.NEXT_PUBLIC_CHANNEL_ID_9,
      process.env.NEXT_PUBLIC_CHANNEL_ID_10,
    ];

    // Check if cached data exists
    const cachedData = getCachedData();
    if (cachedData && !isCacheExpired(cachedData.timestamp)) {
      console.log("Using cached data");
      return cachedData.data;
    }

    const promises = channelIds.map(async (channelId) => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=upcoming&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching data for channel ${channelId}`);
      }

      const data = await response.json();
      console.log(`Data for channel ${channelId}:`, data);

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

      console.log(`Streams for channel ${channelId}:`, streams);

      return streams;
    });

    const allStreams = await Promise.all(promises);
    console.log("All Streams:", allStreams);

    // Cache the data
    setCachedData(allStreams);

    return allStreams;
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return getCachedData()?.data || []; // Return cached data on error if available
  }
}

// Helper function to get cached data
function getCachedData() {
  const cachedData = localStorage.getItem("youtubeDataCache");
  return cachedData ? JSON.parse(cachedData) : null;
}

// Helper function to set cached data
function setCachedData(data) {
  const timestamp = Date.now();
  const cachedData = { data, timestamp };
  localStorage.setItem("youtubeDataCache", JSON.stringify(cachedData));
}

// Helper function to check if the cache is expired (1 hour in milliseconds)
function isCacheExpired(timestamp) {
  //   const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
  const expirationTime = 30 * 1000;
  return Date.now() - timestamp > expirationTime;
}
