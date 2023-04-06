import { TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from "../strt"
import { Upt } from "../helpers"

const smute = async (client: TelegramClient, e: NewMessageEvent, upt: Upt) => {
    try {

        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger
        var message = await client.sendMessage(chatId, { message: "smute command running....." });

    } catch (error: any) {
        console.log("smute: " + error.message)
    }
}

export default smute