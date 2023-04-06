const axios = require("axios");
import * as fs from 'fs'
import { Api, TelegramClient } from 'telegram';
import { CustomFile } from 'telegram/client/uploads';
import { NewMessageEvent } from 'telegram/events';
import Chk from '../helpers/chk';

async function getVideoInfo(videoUrl: any) {
  const response = await axios.get("https://ytdl.panditsiddharth.repl.co/dl", {
    params: {
      url: videoUrl
    }
  });
  return response.data;
}

const yt = async (client: TelegramClient, e: NewMessageEvent) => {
  const y = new Chk(client, e)
  const m: Api.Message = e.message
  let rid: any = await y.edit("Your Link found and processing..", { d: false });

  const videoUrl: any = "https://www.youtube.com/watch?v=JGwWNGJdvx8=9s";
  const yturl: any = (m.message as any).substring(4)
  console.log(yturl)
  try {
    await getVideoInfo(yturl).then(async (data) => {
      await y.edit('wait i am sending video ', { id: rid.id, d: false })
      let res = "720p"
      if(m.isPrivate)
        res = "720p"
      for (let i = 0; i < data.length; i++) {
        if (data[i].url && data[i].fps != false && data[i].aud == true && data[i].fps > 24 && data[i].res == res) {
  console.log(data[i])
          try{
          await fs.unlinkSync('./actions/video.mp4')
        }catch(err: any){
          console.error(err.message)
        }
          await y.edit("Fetch completed Now downloading", { id: rid.id, d: false });
          await downloadVideo(data[i].url, './actions/video.mp4', y, rid)
          await console.log('Video downloaded')
          let l: any = await y.edit('Download completed now sending here..', { id: rid.id, d: false})
          try {
            // await client.sendFile(await y.chat(), { file: './actions/video.mp4', })
                        let file = await client.uploadFile({
             file: new CustomFile("video.mp4", fs.statSync("./actions/video.mp4").size, "./actions/video.mp4"),
             workers: 16,
             });

            
             await client.sendFile(await y.chat(), {file: file,  caption: "Downloaded video[" + data[i].res + "]: " + data[0].title + "\n\n     ~Powered by Logic.B", videoNote: true})

            console.log(file)
            
// const file = await client.uploadFile({
  // file: "./actions/video.mp4" as any,
   //workers: 10,
 //});
            client.deleteMessages(await y.chat(), [l.id], {revoke: false})
            // await y.send("Downloaded video[" + data[i].res + "]: " + data[0].title + "\n\n     ~Powered by Logic.B")
          } catch (err: any) {
            y.edit(err.message)
          }
        }
      }
    })
      .catch((err: any) => { y.edit(err.message) })
  } catch (error: any) {
    await y.edit('Error on download: ' + error.message)

  }
}

export default yt

async function downloadVideo(url: any, path: any, y: any, rid: any) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  await y.edit('25% process completed', { d: false, id: rid.id })
  await console.log("25% process complete")
  response.data.pipe(fs.createWriteStream(path));

  return new Promise((resolve: any, reject: any) => {
    response.data.on('end', () => {
      resolve();
    });
    response.data.on('error', (error: any) => {
      reject(error);
    });
  });
}

