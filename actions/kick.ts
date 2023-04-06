import { Api, TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from "../strt"
import Chk from "../helpers/chk"

const kcik = async (client: TelegramClient, e: NewMessageEvent, upt: any) => {
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
      return await y.edit(`I can't kick User is admin`)
    }

    if (!lt)
    return await y.edit(`User is already kicked`)

    await client.invoke(
      new Api.channels.EditBanned({
        channel: await y.chat(),
        participant: usr,
        bannedRights: new Api.ChatBannedRights({
          untilDate: Math.floor(Date.now() / 1000),// 1/2 minutes from now
          viewMessages: true,
          // sendMessages: false,
        }),
      })
    );

    const result = await client.invoke(
      new Api.channels.EditBanned({
        channel: await y.chat(),
        participant: usr,
        bannedRights: new Api.ChatBannedRights({
          untilDate: Math.floor(Date.now() / 1000), // 1/2 minutes from now
          viewMessages: false,
          // sendMessages: false,
        }),
      })
    );


    if (result)
      await y.edit("User kicked")

  } catch (error: any) {
    console.log("Kick: " + error.message)
    await y.gperr(error.message)
  }
}

export default kcik