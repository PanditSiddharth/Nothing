import { Api, TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from "../strt"
import Chk from "../helpers/chk"

const ban = async (client: TelegramClient, e: NewMessageEvent, upt: any) => {
  const y = new Chk(client, e)
  try {
    const m = e.message
    let usr: any = await y.chk()

    if (!m?.isChannel)
      return await y.edit('This command is group/channels specific')

    let lt: any; try {
      lt = await client.invoke(
        new Api.channels.GetParticipant({
          channel: m?.peerId,
          participant: usr,
        })
      )
    } catch (error) { }

    if (lt && (lt.participant.className == "ChannelParticipantCreator" || lt.participant.className == "ChannelParticipantAdmin")) {
      return await y.edit(`I can't ban User is admin`)
    }

    let tim: any = await y.dtm()

    const result = await client.invoke(
      new Api.channels.EditBanned({
        channel: await y.chat(),
        participant: usr,
        bannedRights: new Api.ChatBannedRights({
          untilDate: Math.floor(Date.now() / 1000) + (tim && tim < 30 ? 30 : tim), // 1/2 minutes from now
          viewMessages: true,
          // sendMessages: false,
        }),
      })
    );


    if (!lt)
      await y.edit(`User is already banned or not available in group`)
    else if (result)
      await y.edit('User banned: ' + (tim && tim >= 10 ? (tim >= 30 ? " until: " + tim + " seconds" : '\nBanning user 30 seconds\nTg not allow to mute less than 30 seconds') : ""));

  } catch (error: any) {
    console.log("Ban: " + error.message)
    await y.gperr(error.message)
  }
}

export default ban