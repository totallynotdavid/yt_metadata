require('dotenv').config();
const youtube_api_key = process.env.YOUTUBE_API_KEY; // eslint-disable-line no-undef
const config = require('../config/production.config');

/**
 * Retrieves detailed information about a YouTube media.
 * @param {string} mediaId - The YouTube media ID.
 * @param {string} mediaType - The type of the media (video, playlist, channel).
 * @return {Promise<object|null>} Detailed information about the media or null on failure.
 */
async function getYoutubeMediaInfo(mediaId, mediaType) {
	try {
		const searchUrl = buildSearchUrl(mediaId, mediaType);
		const response = await fetch(searchUrl);
		if (!response.ok) {
			throw new Error(`YouTube API Error: ${response.status}`);
		}

		const data = await response.json();
		return extractMediaInfo(data, mediaType);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		return null;
	}
}

/**
 * Builds the search URL for the YouTube API request.
 * @param {string} mediaId - The YouTube media ID.
 * @param {string} mediaType - The type of the media.
 * @return {string} The search URL for the YouTube API.
 */
function buildSearchUrl(mediaId, mediaType) {
	const fields = mediaType === 'video' ? 'snippet,statistics,contentDetails' 
		: mediaType === 'playlist' ? 'snippet' 
			: 'snippet,statistics';

	return `https://www.googleapis.com/youtube/v3/${mediaType}s?part=${fields}&id=${mediaId}&key=${youtube_api_key}`;
}

/**
 * Extracts detailed information from the YouTube API response.
 * @param {object} data - The API response data.
 * @param {string} mediaType - The type of the media.
 * @return {object|null} The extracted media information or null if extraction fails.
 */
function extractMediaInfo(data, mediaType) {
	if (!data.items || data.items.length === 0) return null;

	const info = data.items[0].snippet;
	const statistics = data.items[0].statistics;
  const thumbnails = info.thumbnails;

  let thumbnailSize = thumbnails[config.preferredThumbnailSize]
                      ? config.preferredThumbnailSize
                      : config.thumbnailFallbackOrder.find(size => thumbnails[size]);

	const result = {
    mediaType: mediaType,
    thumbnailUrl: thumbnails[thumbnailSize]?.url,
    // description: info?.description, // We do not need the description as they tend to be too long
  };

	// Add specific details based on the media type
	switch (mediaType) {
	case 'video':
		result.title = info?.title;
		result.channelTitle = info?.channelTitle;
		result.viewCount = statistics?.viewCount;
		result.likeCount = statistics?.likeCount;
		break;
	case 'playlist':
		result.title = info?.title;
		result.channelTitle = info?.channelTitle;
		break;
	case 'channel':
		// We omit the title for channels because it's the same as the channel name
		result.channelTitle = info?.title;
		break;
	}

	return result;
}

module.exports = {
	getYoutubeMediaInfo,
};
