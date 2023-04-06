import { Api, TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from "../strt"
import Chk from "../helpers/chk"

const mute = async (client: TelegramClient, e: NewMessageEvent, upt: any) => {
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
     return await y.edit(`I can't mute User is admin`)
  }

  if (lt && lt.participant.bannedRights && lt.participant.bannedRights.sendMessages == true)
  return await y.edit(`User is already mute`)

    let tim : any = await y.dtm()

    const result = await client.invoke(
        new Api.channels.EditBanned({
          channel: await y.chat(),
          participant: usr,
          bannedRights: new Api.ChatBannedRights({
            untilDate: Math.floor(Date.now() / 1000) + (tim && tim < 30 ? 30 : tim), // 1/2 minutes from now
            viewMessages: false,
            sendMessages: true,
          }),
        })
      );

      if (!lt)
      return await y.edit(`User is not available in group [muted]`)
      if(result)
        await y.edit('User muted: ' +  (tim && tim >= 10 ? (tim >= 30 ? " until: " + tim + " seconds": '\nMuting user 30 seconds\nTg not allow to mute less than 30 seconds' ): ""));

    } catch (error: any) {
        console.log("Mute: " + error.message)
        await y.gperr(error.message)
    }
}

export default mute