const { youtubeTypes } = require('./youtubeRegex');

/*
  * Extracts the media ID from a YouTube URL.
  * @param {string} link - The YouTube URL.
  * @returns {[ string, string ]|null} - A tuple of media ID and type, or null on failure.
*/
function extractMediaId(link) {
	if (youtubeTypes.videos.test(link)) {
		return [ extractId(link, youtubeTypes.videos, 5), 'video'];
	} else if (youtubeTypes.playlists.test(link)) {
		return [ extractId(link, youtubeTypes.playlists, 'list='), 'playlist'];
	} else if (youtubeTypes.channels.test(link)) {
		return [ extractId(link, youtubeTypes.channels, '/channel/'), 'channel'];
	}
	return null;
}

/*
  * Extracts the ID from the matched YouTube URL.
  * @param {string} link - The YouTube URL.
  * @param {RegExp} regex - The regex pattern for extracting the ID.
  * @param {number|string} splitValue - The value to use to split the matched string.
  * @returns {string|null} - The extracted ID, or null on failure.
*/
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
};