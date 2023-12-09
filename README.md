# YouTube Metadata Fetcher

Module to retrieve metadata of YouTube content, including videos, playlists, and channels. It allows users to fetch this information either by providing a direct YouTube URL or by searching with a query string.

## Features
- Extract media IDs from YouTube URLs.
- Search YouTube content using a query string and fetch corresponding metadata.
- Support for videos, playlists, and channels.
- Comprehensive error handling and validation for robustness.

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

#### By Search Query
To search YouTube content and fetch metadata using a query string:

```javascript
const query = 'Never Gonna Give You Up';
fetchYoutubeMetadata(query)
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## API Reference

### `fetchYoutubeMetadata(query: string): Promise<any>`

Fetches YouTube metadata.

#### Parameters
- `query` (string): The YouTube URL or search query string.

#### Returns
- A Promise that resolves to the fetched metadata or `null` in case of an error.

## Contributing
Contributions are welcome. Please ensure that your contributions adhere to the project coding standards and include appropriate tests.
