const fetchYoutubeMetadata = require('../src/youtubeMetadata');

async function main(query, fetchType = 'fullData') {
  const metadata = await fetchYoutubeMetadata(query, fetchType);
  console.log(metadata);
  return metadata;
}

async function runTest() {
  await main('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); // this is a video (long form)
  await main('https://youtu.be/dQw4w9WgXcQ', 'idOnly'); // this is a video (short form), we only want the ID
  await main('https://www.youtube.com/watch?v=7AiSeatxXS4&list=PLwEkAnYJ7sRY6OLAxDBhAlUvPpAi6Am6-&pp=iAQB') // this is really a video but it's in a playlist
  await main('https://www.youtube.com/playlist?list=PLpBx-1imHuxISNflNHo0Qr4mQ8l3mqmyi') // this is a playlist
  await main('https://www.youtube.com/channel/UC_LQrLv47K0Fd3k2MB1kBRQ') // this is a channel (old format)
  await main('https://www.youtube.com/@CulturaSiglo21') // this is a channel (new format)
}

runTest();
