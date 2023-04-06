import {TelegramClient} from "telegram";
const { Button } = require("telegram/tl/custom/button");
import { NewMessageEvent } from "telegram/events";
import { Upt } from "../helpers";
 // PS this function is not async

 const seth = async (client: TelegramClient, e: NewMessageEvent, upt: Upt) => {
const markup = client.buildReplyMarkup(Button.inline("Hello!"));
const m = e.message
const chatId = m.chatId as import("big-integer").BigInteger
await client.sendMessage(chatId, {
    message: "click me!",
    buttons: markup,
})
 }