// Importing modules
const { searchYoutubeMedia } = require('./youtubeSearch');
const { extractMediaId } = require('./youtubeExtractor');
const { youtubeTypes } = require('./youtubeRegex');
const { getYoutubeMediaInfo } = require('./youtubeDetails');

/*
  * Fetches the metadata for YouTube media.
  * @param {string} query - The Youtube URL or search query.
  * @returns {Promise<object|null>} - Metadata of the YouTube media, or null on failure.
*/
async function fetchYoutubeMetadata(query, fetchType = 'fullData') {
  try {
    validateQuery(query);
    const queryArray = query.trim().split(/\s+/);
    let mediaId, mediaType;

    if (isYoutubeLink(queryArray[0]) && queryArray.length === 1) {
      // Extracting media ID and type from URL
      [mediaId, mediaType] = extractMediaId(queryArray[0]);
    } else {
      // Searching for media ID and type using the YouTube API
      [mediaId, mediaType] = await searchYoutubeMedia(queryArray.join('+'));
    }

    if (!mediaId || !mediaType) {
      throw new Error('Unable to extract YouTube media ID and type');
    }

    if (fetchType === 'idOnly') {
      return { mediaId, mediaType };
    }

    // Fetch detailed information about the media if we pass the fullData flag
    return await getYoutubeMediaInfo(mediaId, mediaType);
  } catch (error) {
    console.error(`Error in fetchYoutubeMetadata: ${error.message}`);
    return null;
  }
}

/*
  * Determines if the provided query is a YouTube link.
  * @param {string} link - The query string or URL.
  * @returns {boolean} - True if it's a YouTube link, false otherwise.
*/
function isYoutubeLink(link) {
  return youtubeTypes.videos.test(link) || 
         youtubeTypes.playlists.test(link) || 
         youtubeTypes.channels.test(link);
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
