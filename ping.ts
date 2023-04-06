import { Api, TelegramClient } from "telegram";
import { sleep, up } from "./strt";
import Chk from "./helpers/chk";

const ping = async (client: TelegramClient, e: any, upt:any ) =>{
      // console.log(m.peerId)
  const m = e.message
      try {
        upt = up()
        const y = new Chk(client,e)

        // const yo = async () => {
        //   for (let i = 0; i < 100000000; i++) {
        //     console.log(upt)
        //     await sleep(1000)
        //   }
        // }
        // yo()

await y.edit(`
  .╭╮╱╱╱╱╱╱╱╱╭━━╮
  ┃┃╱╱╱╱╱╱╱╱┃╭╮┃
  ┃┃╱╱┳━━┳━━┃╰╯╰╮
  ┃┃╱╭┃╭╮┫╭━┃╭━╮┃
  ┃╰━╯┃╰╯┃╰━┫╰━╯┃
  ╰━━━┻╮━┻━━┻━━━╯
  ╱╱╱╭━╯┃
  ╱╱╱╰━━╯
  
  💓 PONG! Your Logic.B userbot is ready.
  💓 𝗨𝗽𝘁𝗶𝗺𝗲 👉 ${upt.h + ' : ' + upt.m + ' : ' + upt.s}
  ━━━━━━━━━━━━━━━━━━━━━━
  `)

      } catch (err) { console.log(err) }
    
  }
  export default ping
  