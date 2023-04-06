import bigInt from "big-integer";
import { Api, TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events"
import { NewMessage } from "telegram/events/NewMessage"
import { sleep, up } from "./strt";
import actions from "./actions"
import Chk from "./helpers/chk";
import helpb from "./bot/help";

const start = async (client: TelegramClient, bot: any) => {
    try {
        let upt: any = up()
        let aa = true;


        const handler = async (event: NewMessageEvent) => {
            try {
                helpb(bot)
            } catch (error) {
                
            }
            // await helpb(client, event, bot)
            // Declarations
            const y = new Chk(client, event)
            const e = event;
            const m: Api.Message = event.message;
            // console.log(await y.upt())

            const mm = await JSON.parse(JSON.stringify(event.message));
            // const strt = '*'
//console.log(mm.viaBotId);
            if (m.fromId && mm.peerId.channelId && mm.peerId.channelId == '1492591072') {
// console.log(mm.viaBotId);

   let str = "461843263 609517172 1806208310"
          if(str.includes(mm.fromId.userId)){

            try {
              client.deleteMessages(m.peerId, [m.id], {});
            } catch (error) {
              
            }
      
          }
              //console.log(mm);
              
            //     console.log(await client.getEntity(5089277536))

             } 
              if ((m.out === true || m.fromId && (mm.fromId.userId == 1791106582 || mm.fromId.userId == 5860242015)) && m.message.startsWith(upt.strt)) {
                try {
                    if (aa) {
                        aa = false;
                        sleep(200).then(() => aa = true)
                        await actions(client, e, upt, bot)
                    }
                } catch (err) { console.log(err); }
            }
            else if(m.isPrivate && aa) {
                aa = false;
                sleep(3000).then(() => aa = true)
              //  y.edit("Sleeping 3seconds here for your id security(use it in group/channels)")
               await actions(client, e, upt, bot)
            }

        };
        client.addEventHandler(handler, new NewMessage({}));
    } catch (err) { console.log("start: " + err); }
}

export default start