const { youtubeTypes } = require('./regex.js');

function extractMediaId(link) {
  if (youtubeTypes.videos.test(link)) {
    // Extract video ID
    const match = link.match(youtubeTypes.videos);
    return match && match[5];
  } else if (youtubeTypes.playlists.test(link)) {
    // Extract playlist ID
    const match = link.match(youtubeTypes.playlists);
    return match && match[0].split("list=")[1];
  } else if (youtubeTypes.channels.test(link)) {
    // Extract channel ID
    const match = link.match(youtubeTypes.channels);
    return match && match[0].split("/channel/")[1];
  }
  return null;
}

module.exports = {
  extractMediaId,
}