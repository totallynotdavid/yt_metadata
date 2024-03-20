require('dotenv').config();

// Retrieve all environment variables that start with "YOUTUBE_API_KEY"
const apiKeys = Object.entries(process.env) // eslint-disable-line no-undef
	.filter(([key]) => key.startsWith('YOUTUBE_API_KEY'))
	.map(([, value]) => value);

let currentApiKeyIndex = 0;

/**
 * Returns the next API key in the rotation.
 * @returns {string} The next API key.
 */
function getNextApiKey() {
	const apiKey = apiKeys[currentApiKeyIndex];
	currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
	return apiKey;
}

module.exports = {
	getNextApiKey,
};
