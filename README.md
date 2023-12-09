# YouTube Metadata Fetcher

Module to retrieve metadata of YouTube content, including videos, playlists, and channels. It allows users to fetch this information either by providing a direct YouTube URL or by searching with a query string.

## Features

- Extract media IDs and types from YouTube URLs.
- Search YouTube content using a query string and fetch corresponding metadata.
- Support for videos, playlists, and channels.
- Fetch configurable thumbnail sizes for YouTube media with fallback options.
- Option to fetch either metadata or the YouTube media ID and what type of media it is.

## Installation

To install the module, run the following command in your project directory:

```bash
npm install yt_metadata
```

## Usage

### Importing the Module
First, import the module in your JavaScript file:

```javascript
const fetchYoutubeMetadata = require('yt_metadata');
```

### Fetching Metadata

#### By URL

To fetch metadata from a YouTube URL (video, playlist, or channel):

```javascript
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Example YouTube video URL
fetchYoutubeMetadata(url)
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

The result you can expect is something like this:

```json
{
  mediaType: 'video',
  thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/sddefault.jpg',
  title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
  channelTitle: 'Rick Astley',
  viewCount: '1478540522',
  likeCount: '17094295'
}
```

#### By Search Query

To search YouTube content and fetch metadata using a query string:

```javascript
const query = 'Never Gonna Give You Up';
fetchYoutubeMetadata(query)
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

The result you can expect is similar to the example given before.

#### Fetching specific Data Types

You can specify the type of data to fetch: idOnly for media ID and type, or fullData for a more complete metadata.

```js
// Fetch only media ID and type
fetchYoutubeMetadata(query, 'idOnly')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Fetch complete metadata
fetchYoutubeMetadata(query, 'fullData')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

The result from the first case will be something like this:

```json
{ 
  mediaId: 'dQw4w9WgXcQ', 
  mediaType: 'video' 
}
```

The result for the second case is similar to before as the default mode is `fullData`.

## Configuration

### Thumbnails

You can configure the preferred thumbnail size in the `production.config.js` file in the `config` folder. Available options are 'default', 'medium', 'high', 'standard', and 'maxres'; these are set by Youtube and are not always available. The module will attempt to fetch the preferred size and fallback to other sizes if the preferred size is not available.

## API Reference

### `fetchYoutubeMetadata(query: string, fetchType: string): Promise<any>`

Fetches YouTube metadata.

#### Parameters

- `query` (string): The YouTube URL or search query string.
- `fetchType` (string): Specifies the type of data to fetch (idOnly or fullData).

#### Returns

- A Promise that resolves to the fetched metadata or `null` in case of an error.

## Contributing

Contributions are welcome. Please ensure that your contributions adhere to the project coding standards and include appropriate tests.
