const yt_fetcher = require('../src/index');
const { extractMediaId } = require('../src/search/get_id');
const { searchYoutubeMedia } = require('../src/search');

jest.mock('../src/search');

const ytFetcherTestCases = [
  { query: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
  { query: 'Never Gonna Give You Up', expected: 'dQw4w9WgXcQ', isSearchQuery: true },
  { query: 'https://invalidurl.com', expected: null },
  { query: '', expected: null },
];

const extractMediaIdTestCases = [
  { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
  { url: 'https://www.youtube.com/playlist?list=PLK_B1a9wXn7ePjQZvIA0C_FeOn4WrW6U5', expected: 'PLK_B1a9wXn7ePjQZvIA0C_FeOn4WrW6U5' },
  { url: 'https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw', expected: 'UC_x5XG1OV2P6uZZ5FSM9Ttw' },
  { url: 'https://example.com', expected: null },
];

describe('yt_fetcher', () => {
  ytFetcherTestCases.forEach(({ query, expected, isSearchQuery }) => {
    it(`should return ${expected} for query: ${query}`, async () => {
      if (isSearchQuery) {
        searchYoutubeMedia.mockResolvedValue([expected, 'video']);
      }
      await expect(yt_fetcher(query)).resolves.toEqual(expected);
    });
  });
});

describe('extractMediaId', () => {
  extractMediaIdTestCases.forEach(({ url, expected }) => {
    it(`should extract ${expected} from URL: ${url}`, () => {
      expect(extractMediaId(url)).toBe(expected);
    });
  });
});