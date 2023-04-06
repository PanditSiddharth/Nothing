import { TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from "../strt"
import Chk from "../helpers/chk"

const help =async (client:TelegramClient, e: NewMessageEvent, upt : any) => {
    try {
    const y = new Chk(client, e)
    const m = e.message
    const chatId = m.chatId as import("big-integer").BigInteger
    
    y.edit(`
𝐇𝐞𝐥𝐩: 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐢𝐧 𝐔𝐬𝐞𝐫𝐛𝐨𝐭

*𝐡𝐞𝐥𝐩 to see help
*𝐩𝐢𝐧𝐠 to see uptime(status)
*𝐤𝐢𝐥𝐥 to make animation text
*𝐢𝐧𝐢𝐭 to initialize useridies
*𝐬𝐞𝐭𝐝𝐞𝐥 to set auto deletion time
*𝐜𝐥𝐨𝐧𝐞 to clone users profile
    *𝐜𝐥𝐨𝐧𝐞 𝐬 to save current profile
    *𝐜𝐥𝐨𝐧𝐞 𝐫 to retrive saved

𝐆𝐫𝐨𝐮𝐩 𝐀𝐝𝐦𝐢𝐧 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬: 
*𝐛𝐚𝐧 to ban users
*𝐦𝐮𝐭𝐞 to mute users
*𝐮𝐧𝐦𝐮𝐭𝐞 to unmute users
*𝐮𝐧𝐛𝐚𝐧 to unban users
*𝐤𝐢𝐜𝐤 to kick users

𝐔𝐬𝐞 𝐭𝐢𝐦𝐞𝐬 𝐢𝐧 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬:
second:s or S  minute:m  
Hour: h or H
12hour: d  24hour: D
weak: w or W
month: M   Year: y or Y

𝐄𝐱𝐚𝐦𝐩𝐥𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬:
*𝐦𝐮𝐭𝐞 sid 1m  // 1 minute mute
*𝐮𝐧𝐛𝐚𝐧 sid  // unban sid

    𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐋𝐨𝐠𝐢𝐜.𝐁
    `)


} catch (error: any) {
        console.log("help: " + error.message)
}
}

export default help