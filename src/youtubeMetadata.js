// Importing modules
const { searchYoutubeMedia } = require('./youtubeSearch');
const { extractMediaId } = require('./youtubeExtractor');
const { youtubeTypes } = require('./youtubeRegex');

// Check if the query is a YouTube link with the help of regex
const isYoutubeLink = (link) => youtubeTypes.videos.test(link) || youtubeTypes.playlists.test(link) || youtubeTypes.channels.test(link);

// Main function to fetch the metadata of the YouTube media (video, playlist or channel)
async function fetchYoutubeMetadata(query) {
  try {
    validateQuery(query);

    const queryArray = query.trim().split(/\s+/);

    if (isYoutubeLink(queryArray[0])) {
      return extractMediaId(queryArray[0]);
    } else {
      return await searchYoutubeMedia(queryArray.join('+'));
    }
  } catch (error) {
    console.error(`Error in fetchYoutubeMetadata: ${error.message}`);
    return null;
  }
}

// Validate the query
function validateQuery(query) {
  if (!query || typeof query !== 'string') {
    throw new Error('Invalid query provided');
  }

  if (query.trim().length === 0) {
    throw new Error('Empty query provided');
  }
}

module.exports = fetchYoutubeMetadata;
