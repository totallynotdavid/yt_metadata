const { youtubeTypes } = require('./youtubeRegex');

function extractMediaId(link) {
  if (youtubeTypes.videos.test(link)) {
    return extractId(link, youtubeTypes.videos, 5);
  } else if (youtubeTypes.playlists.test(link)) {
    return extractId(link, youtubeTypes.playlists, "list=");
  } else if (youtubeTypes.channels.test(link)) {
    return extractId(link, youtubeTypes.channels, "/channel/");
  }
  return null;
}

function extractId(link, regex, splitValue) {
  const match = link.match(regex);
  return match ? match[0].split(splitValue)[1] : null;
}

module.exports = {
  extractMediaId,
}