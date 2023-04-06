import { Api, TelegramClient } from "telegram"
import { NewMessage, NewMessageEvent } from "telegram/events"
import Chk from "../helpers/chk"

const unmute = async (client: TelegramClient, e: NewMessageEvent, upt: any) => {
  const y = new Chk(client, e)
  try {
    const m = e.message
    let user: any = await y.chk()

    if (!m?.isChannel)
      return await y.edit('This command is group/channels specific')

    let lt: any; try {
      lt = await client.invoke(
        new Api.channels.GetParticipant({
          channel: m?.peerId,
          participant: user,
        })
      )
    } catch (error) { }

    if (lt && (lt.participant.className == "ChannelParticipantCreator" || lt.participant.className == "ChannelParticipantAdmin")) {
      return await y.edit(`I can't unmute User is admin`)
    }

    if (lt && lt.participant.bannedRights && lt.participant.bannedRights.sendMessages == false)
      return await y.edit(`User is already unmute`)

    const result = await client.invoke(
      new Api.channels.EditBanned({
        channel: await y.chat(),
        participant: user,
        bannedRights: new Api.ChatBannedRights({
          untilDate: Math.floor(Date.now() / 1000), // 1/2 minutes from now
          viewMessages: false,
          sendMessages: false,
          sendMedia: false,
          sendStickers: false,
          sendGifs: false,
          sendGames: false,
          sendInline: false,
          sendPolls: false,
          changeInfo: false,
          inviteUsers: false,
          pinMessages: false,
        }),
      })
    );

    if (result)
      await y.edit('User unmuted: ' + user);

    // (tim ? " " + tim + " seconds" : "")

  } catch (error: any) {
    console.log("UnMute: " + error.message)
    await y.gperr(error.message)
  }
}

export default unmute