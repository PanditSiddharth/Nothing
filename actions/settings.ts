import { Api, TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from "../strt"
import { Upt } from "../helpers"
const { Button } = require("../node_modules/telegram/tl/custom/button");
import Chk from "../helpers/chk";

const settings = async (client: TelegramClient, client1: TelegramClient, e: NewMessageEvent) => {
    try {
        const m: Api.Message = e.message

const resut: Api.messages.BotResults = await client.invoke(
    new Api.messages.GetInlineBotResults({
      bot: "@node231bot",
      peer: "@shabdt",
      query: "bot",
      offset: "@gif ",
      geoPoint: new Api.InputGeoPoint({
        lat: 8.24,
        long: 8.24,
        accuracyRadius: 1,
      }),
    })
  );

let y =  new Chk(client, e)

const result2: any = await client.invoke(
    new Api.messages.SendInlineBotResult({
      peer: await y.chat(),
      // randomId: resut.results[0].id,
      queryId: resut.queryId,
      id: resut.results[0].id,
      hideVia: true,
      scheduleDate: 0,
      // sendAs: "gif",
    })
  );

  console.log(result2.updates[2].message)
  let med: any = result2.updates[2].message.media

    } catch (error: any) {
        console.log("settings: " + error.message)
    }
}

export default settings