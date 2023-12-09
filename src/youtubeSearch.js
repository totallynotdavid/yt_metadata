require('dotenv').config()
const youtube_api_key = process.env.YOUTUBE_API_KEY;

async function searchYoutubeMedia(query) {
  try {
    const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&key=${youtube_api_key}`;
    const response = await fetch(searchURL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`YouTube API responded with ${response.status}`);
    }

    return extractMediaDetails(data);
  } catch (error) {
    console.error(`Error in searchYoutubeMedia: ${error.message}`);
    return null;
  }
}

function extractMediaDetails(data) {
  if (data.items && data.items.length > 0) {
    const { videoId, playlistId, channelId } = data.items[0].id;
    const mediatype = videoId ? 'video' : playlistId ? 'playlist' : channelId ? 'channel' : null;

    return [videoId || playlistId || channelId, mediatype];
  } else {
    return null;
  }
}

module.exports = {
  searchYoutubeMedia,
};