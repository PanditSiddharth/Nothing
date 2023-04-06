
// import { join } from "../node_modules/gram-tgcalls/src/calls";
// import { GramTGCalls } from "../node_modules/gram-tgcalls/src/index";
// import { GramTGCalls } from "gram-tgcalls/src/index";

import { Api, client, TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events";
import Chk from "../helpers/chk";
// import { TGCalls, Stream } from "tgcalls-next";
// import { SdpBuilder } from '../node_modules/tgcalls-next/lib/sdp_builder.d.ts';

export let call: any;
let y: any;
const vc = async (client: TelegramClient, e: NewMessageEvent) => {
    
    let y = new Chk(client, e)
    try{
    const result = await client.invoke(
        new Api.phone.CreateGroupCall({
          peer: "@ignou_bca_group",
          randomId: e.message.id,
        //   rtmpStream: true,
          title: "My very normal title",
          scheduleDate: 0,
        })
      );
      call = (result as any).updates[0].call

    //   console.log((result as any).updates[0].call); 


}catch(err: any){
    console.log(await y.chat())
    console.log(err.message)
}
}

export default vc


export const joinvc = async (client: TelegramClient, e: NewMessageEvent) => {
    const ssrc: number = Math.floor(Math.random() * 4294967296);
    let y = new Chk(client, e)
try{
    const reslt = await client.invoke(
        new Api.channels.GetFullChannel({
          channel: await y.chat(),
        })
      );
      console.log(reslt.fullChat.call); 
      let cll: any = reslt.fullChat.call

        // join(client, cll, )


      const dt = await client.invoke(new Api.phone.GetCallConfig());
      console.log(dt); 
    
    const result = await client.invoke(
        new Api.phone.JoinGroupCall({
          call: new Api.InputGroupCall({
            id: cll.id,
            accessHash: cll.accessHash,
          }),
          joinAs: "@panditSiddharth0",
          params: new Api.DataJSON({
            data: dt.data,
          }),
          muted: true,
          videoStopped: true,
         
          // inviteHash: "some string",
        })
      );
      console.log(result);

    //   const mt = await client.invoke(new Api.phone.JoinGroupCall())
        // let n = new TGCalls(undefined)
        // let n = new GramTGCalls(client, await y.chat())
        // n.
    // n.stream(undefined,undefined,{join: {muted: false, videoStopped: false},})
        // join(client, cll, )

 

    } catch (e: any) { console.log(e.message);
    y.edit("in Join Call error: " + e.message)
    }
}

export const endvc = async (client: TelegramClient, e: NewMessageEvent) => {

    let y = new Chk(client, e)
try{
    const reslt = await client.invoke(
        new Api.channels.GetFullChannel({
          channel: await y.chat(),
        })
      );
      console.log(reslt.fullChat.call); 
      let cll: any = reslt.fullChat.call

    //   console.log(call); 

    //   const res = await client.invoke(
    //     new Api.phone.JoinGroupCall({
    //       call: new Api.InputGroupCall({
    //         id: cll.id as any,
    //         accessHash: cll.accessHash as any,
    //       }),
    //     //   joinAs: "username",
    //     //   params: new Api.DataJSON({
    //     //     data: "some string here",
    //     //   }),
    //       muted: true,
    //       videoStopped: true,
    //     //   inviteHash: "some string here",
    //     })
    //   );
    //   console.log(res); 

    const result = await client.invoke(
        new Api.phone.DiscardGroupCall({
          call: new Api.InputGroupCall({
            id: cll.id,
            accessHash: cll.accessHash,
          }),
        })
      );
      console.log(result);

    } catch (e: any) { console.log(e.message); 
    y.edit("in Join Call error: " + e.message)
    }
}