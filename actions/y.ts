// const ytdl = require("ytdl-core");
// (async ()=>{
//  const info = await ytdl.getInfo('https://www.youtube.com/watch?v=Jm_wpjfYUhg')
// })()

const https = require('https');
const fs = require('fs');

const videoUrl = 'https://www.youtube.com/watch?v=QGJuMBdaqIw';

https.get(videoUrl, (res: any) => {
  res.on('data', (data: any) => {
    fs.appendFileSync('video.mp4', data);
  });
  res.on('end', () => {
    console.log('Video downloaded successfully!');
  });
});









