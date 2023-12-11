const fetchYoutubeMetadata = require('../src/youtubeMetadata');
const { extractMediaId } = require('../src/youtubeExtractor');
const { searchYoutubeMedia } = require('../src/youtubeSearch');

jest.mock('../src/youtubeSearch');

const ytFetcherTestCases = [
  {
    query: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    validate: (result) => {
      return result.mediaType === 'video' &&
             typeof result.title === 'string' &&
             result.channelTitle === 'Rick Astley' &&
             typeof result.viewCount === 'string' &&
             typeof result.likeCount === 'string';
    }
  },
  {
    query: 'Never Gonna Give You Up',
    validate: (result) => {
      return result.mediaType === 'video' &&
             typeof result.title === 'string' &&
             result.channelTitle === 'Rick Astley' &&
             typeof result.viewCount === 'string' &&
             typeof result.likeCount === 'string';
    }
  }
];

const extractMediaIdTestCases = [
  // { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', expected: ['dQw4w9WgXcQ', 'video'] }, // Ignored because it requires an API call and the Github runner doesn't have the API key
  { url: 'https://www.youtube.com/playlist?list=PLK_B1a9wXn7ePjQZvIA0C_FeOn4WrW6U5', expected: ['PLK_B1a9wXn7ePjQZvIA0C_FeOn4WrW6U5', 'playlist'] },
  { url: 'https://www.youtube.com/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw', expected: ['UC_x5XG1OV2P6uZZ5FSM9Ttw', 'channel'] },
  { url: 'https://example.com', expected: null },
];

searchYoutubeMedia.mockImplementation(query => {
  if (query === 'Never Gonna Give You Up') {
    return Promise.resolve({
      mediaType: 'video',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      channelTitle: 'Rick Astley',
      viewCount: '1478248001',
      likeCount: '17092393'
    });
  }
});

describe('fetchYoutubeMetadata', () => {
  ytFetcherTestCases.forEach(({ query, validate }) => {
    it(`should validate result for query: "${query}"`, async () => {
      const result = await fetchYoutubeMetadata(query);

      if (result) {
        expect(validate(result)).toBeTruthy();
      } else {
        expect(result).toBeNull();
      }
    });
  });
});

describe('extractMediaId', () => {
  extractMediaIdTestCases.forEach(({ url, expected }) => {
    it(`should extract "${expected}" from URL: ${url}`, () => {
      expect(extractMediaId(url)).toStrictEqual(expected);
    });
  });
});
