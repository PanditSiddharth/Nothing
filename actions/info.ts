import bigInt from "big-integer"
import { Api, TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from "../strt"
import Chk from "../helpers/chk"

const info = async (client: TelegramClient, e: NewMessageEvent, upt: any) => {
    let y: any = new Chk(client, e)
    const m = e.message
    const chatId = m.chatId as import("big-integer").BigInteger || m.peerId
    // const messages = await client.getMessages(chatId)
    // console.log(messages)
    try {
        let usr: any = await y.chk()
        let ch: any;
  
        try {
            ch = await client.invoke(
                new Api.users.GetFullUser({
                    id: usr,
                })
            )
        } catch (error) {
           if(!ch)
           return y.edit("Sorry I can't find details you can use [ *init 9 ] command then again send your commands")
         }

        const user: any = ch.users[0]
        // await y.edit('yo')
        // console.log(user)

        const sent = await y.edit(`
𝗜𝗻𝗳𝗼 𝗼𝗳 𝗨𝘀𝗲𝗿 ${user.firstName}

 𝗙𝗶𝗿𝘀𝘁 𝗡𝗮𝗺𝗲: ${user.firstName}${user.lastName ? "\n 𝗟𝗮𝘀𝘁 𝗡𝗮𝗺𝗲: " + user.lastName : ''}
 𝗨𝘀𝗲𝗿𝗜𝗱: ${user.id}${user.username ? '\n 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: @' + user.username : ''}
 𝗣𝗿𝗲𝗺𝗶𝘂𝗺: ${user.premium == true ? JSON.stringify(user.premium) : "No"}${user.phone ? '\n 𝗣𝗵𝗼𝗻𝗲: ' + user.phone : ''}
 𝗙𝗮𝗸𝗲: ${user.fake == false ? 'No' : "Yes"}${user.scam != false ? '\n Scammed: ' + JSON.stringify(user.scam) : ''}
    `)
// ${user.status != null && user.status.className == 'UserStatusOffline' ? " 𝗦𝘁𝗮𝘁𝘂𝘀: Offline" : (user.status.className == 'UserStatusRecently' ? " 𝗦𝘁𝗮𝘁𝘂𝘀: Recent" : ' 𝗦𝘁𝗮𝘁𝘂𝘀: 𝗢𝗻𝗹𝗶𝗻𝗲')}

    } catch (error: any) {
        console.log("info: " + error.message)
        
    }
}

export default info
