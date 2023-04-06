import { TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events";
import ban from "./actions/ban";
import mute from "./actions/mute"
import info from "./actions/info";
import unmute from "./actions/unmute"
import { Upt } from "./strt";
import help from "./actions/help";
import kick from "./actions/kick";
import unban from "./actions/unban";
import clone from "./actions/clone";
import smute from "./actions/smute";
import ping from "./ping";
import Chk from "./helpers/chk";
import kill from "./art/kill";
import yt from "./actions/yt";
import settings from "./bot/settings";
import timer from "./actions/timer"
import helpb, { hlp } from "./bot/help";
import vc, { endvc, joinvc } from "./bot/vc";

const actions = async (client: TelegramClient, e: NewMessageEvent, upt: Upt, bot: any) => {
    const y = new Chk(client, e)
    try {
        // Declarations
        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger
        // var message = await client.sendMessage(chatId, { message: "runnig....." });

        if (m.message.includes(upt.strt + 'mute'))
            await mute(client, e, upt)

        if (m.message.includes(upt.strt + 'unmute'))
            await unmute(client, e, upt)

        if (m.message.includes(upt.strt + 'info'))
            await info(client, e, upt)

        if (m.message.includes(upt.strt + 'ban'))
            await ban(client, e, upt)

        // if (m.message.includes(upt.strt + 'help'))
        //     await help(client, e, upt)

        if (m.message.includes(upt.strt + 'kick'))
            await kick(client, e, upt)

        if (m.message.includes(upt.strt + 'unban'))
            await unban(client, e, upt)

        if (m.message.includes(upt.strt + 'clone'))
            await clone(client, e, upt)

        if (m.message.includes(upt.strt + 'init'))
            await y.innit()

        // if (m.message.includes(upt.strt + 'settings') || m.message.includes(upt.strt + 'set'))
        //     await settings(client, e)

        if (m.message.includes(upt.strt + 'ping'))
            ping(client, e, upt)

        if (m.message.includes(upt.strt + 'yt'))
            await yt(client, e)

        if (m.message.includes(upt.strt + 'kill'))
            await kill(client, e, upt)

        if (m.message.includes(upt.strt + 'setdel'))
            await y.setdel()

        if (m.message.includes(upt.strt + 'set') || m.message.includes(upt.strt + 'settings'))
            await settings(client, e, bot)

        if (m.message.includes(upt.strt + 'help') || m.message.includes(upt.strt + 'hlp'))
            await hlp(client, e)

            if (m.message.includes(upt.strt + 'vc'))
            await vc(client, e)

            if (m.message.includes(upt.strt + 'endvc'))
            await endvc(client, e)

            if (m.message.includes(upt.strt + 'joinvc'))
            await joinvc(client, e)

               if (m.message.includes(upt.strt + 'timer'))
            await timer(client, e)

    } catch (error: any) {
        console.log(`Actions: ${error.message}`)
        y.edit(error.message)
    }
}

export default actions