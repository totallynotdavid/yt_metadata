// Importing modules
const searchYoutubeMedia = require('./search.js');
const extractMediaId = require('./search/regex.js');
const { youtubeTypes } = require('./search/regex.js');

// Definitions
const isYoutubeLink = (link) => youtubeTypes.videos.test(link) || youtubeTypes.playlists.test(link) || youtubeTypes.channels.test(link);

async function yt_metadata(query) {
  try {
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid query provided');
    }

    const stringify_query = query.trim().split(/\s+/);
    if (stringify_query.length === 0) {
      throw new Error('Empty query provided');
    }

    console.log(`Query: ${query}`);
    console.log(`Query array: ${stringify_query}`);
    console.log(`Query length: ${stringify_query.length}`);

    if (isYoutubeLink(stringify_query[0])) {
      return extractMediaId(stringify_query[0]);
    } else {
      return await searchYoutubeMedia(stringify_query.join('+'));
    }
  } catch (error) {
    console.error(`Error in yt_metadata: ${error.message}`);
    return null;
  }
}

module.exports = yt_metadata;