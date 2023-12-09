// Importing modules
const { searchYoutubeMedia } = require('./youtubeSearch');
const { extractMediaId } = require('./youtubeExtractor');
const { youtubeTypes } = require('./youtubeRegex');

/*
  * First filter to determine if the provided query is a YouTube link.
  * @param {string} link - The query string or URL.
  * @returns {boolean} - True if it's a YouTube link, false otherwise.
*/
const isYoutubeLink = (link) => (
  youtubeTypes.videos.test(link) || 
  youtubeTypes.playlists.test(link) || 
  youtubeTypes.channels.test(link)
);

/*
  * Fetches the metadata for YouTube media.
  * @param {string} query - The Youtube URL or search query.
  * @returns {Promise<[ string, string ]|null>} - A tuple of media ID and type, or null on failure.
*/
async function fetchYoutubeMetadata(query) {
  try {
    validateQuery(query);

    const queryArray = query.trim().split(/\s+/);

    if (isYoutubeLink(queryArray[0]) && queryArray.length === 1) {
      // Because the query has a length of 1 and passes the isYoutubeLink test, it must be a YouTube link. We can safely extract the media ID.
      return extractMediaId(queryArray[0]);
    } else {
      // We build the query string by joining the array with a '+' to search for it using the YouTube API.
      return await searchYoutubeMedia(queryArray.join('+'));
    }
  } catch (error) {
    console.error(`Error in fetchYoutubeMetadata: ${error.message}`);
    return null;
  }
}

/*
  * Validates the provided query.
  * @param {string} query - The query string to validate.
*/
function validateQuery(query) {
  if (!query || typeof query !== 'string') {
    throw new Error('Invalid query provided');
  }

  if (query.trim().length === 0) {
    throw new Error('Empty query provided');
  }
}

module.exports = fetchYoutubeMetadata;
