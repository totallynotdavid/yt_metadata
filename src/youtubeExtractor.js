const { youtubeTypes } = require('./youtubeRegex');

function extractMediaId(link) {
  if (youtubeTypes.videos.test(link)) {
    return [ extractId(link, youtubeTypes.videos, 5), 'video'];
  } else if (youtubeTypes.playlists.test(link)) {
    return [ extractId(link, youtubeTypes.playlists, "list="), 'playlist'];
  } else if (youtubeTypes.channels.test(link)) {
    return [ extractId(link, youtubeTypes.channels, "/channel/"), 'channel'];
  }
  return null;
}

function extractId(link, regex, splitValue) {
  const match = link.match(regex);
  if (!match) return null;

  // Different handling based on the type of splitValue
  if (typeof splitValue === 'number') {
    // If it's a number, it's used as an index for the regex match groups
    return match[splitValue];
  } else {
    // If it's a string, it's used to split the matched string
    return match[0].split(splitValue)[1];
  }
}

module.exports = {
  extractMediaId,
}