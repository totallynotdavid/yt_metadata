const fetchYoutubeMetadata = require('../src/youtubeMetadata');

async function main(query) {
  const metadata = await fetchYoutubeMetadata(query);
  console.log(metadata);
  return metadata;
}

async function runTest() {
  await main('hhttps://invalidurl.com');
  await main('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
}

runTest();
