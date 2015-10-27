import Request from 'request';
import YoutubeUrl from 'youtube-url';

function extractVideoData(youtubeResponse) {
  const { title, description, thumbnails } = youtubeResponse.snippet;
  const { duration } = youtubeResponse.contentDetails;

  return {
    _id: youtubeResponse.id,
    title,
    description,
    thumbnailUrl: thumbnails.default.url,
    duration: parseDuration(duration),
    votes: 0
  };
}

export default {
  getVideoInfo: (videoUrl, callback) => {
    const videoId = YoutubeUrl.extractId(videoUrl);

    if (!videoId) { return callback('Not a valid YouTube link.'); }
    const options = {
      url: 'https://www.googleapis.com/youtube/v3/videos',
      method: 'GET',
      qs: {
        part: 'snippet,contentDetails',
        id: videoId,
        key: 'AIzaSyBumCB9owPnolytIWTsexxDycsAKeRb4Ho'
      }
    }

    Request(options, (error, response, body) => {
      if (error) { return callback(error); }
      callback(null, extractVideoData(JSON.parse(body).items[0]));
    });
  }
};

function parseDuration (duration) {
  const pattern = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (pattern.test(duration)) {
    const matches = pattern.exec(duration);

    if (matches[1])
      hours = Number(matches[1]);
    if (matches[2])
      minutes = Number(matches[2]);
    if (matches[3])
      seconds = Number(matches[3]);
    return hours * 3600 + minutes * 60 + seconds;
  }
}