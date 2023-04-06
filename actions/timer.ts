import {TelegramClient} from 'telegram';
import {NewMessageEvent} from 'telegram/events';
import Chk from '../helpers/chk'
//import sleep from '../strt'

let timer = async (client: TelegramClient, e: NewMessageEvent)=>{
  let y = new Chk(client, e)
  let tim = await y.dtm() || 0
const sleep = (t: number | undefined) => new Promise((resolve) => setTimeout(resolve, t));
  
  y.edit((tim) + " seconds left", {d:false})
  .then(async (mes: any)=>{
    try{
  for (let i: any = 0; i < tim; i+= 5) {
      await sleep(5000)
      let s = Math.floor((tim - i - 5)%60)
      let m = Math.floor((tim - i - 5)/60)
    await y.edit( m + " Minutes :" + s + " seconds left" , {d:false, id: mes.id});
  }
   y.edit("time end",{id: mes.id});
    } catch (err: any){
      y.edit('timer error')
    }
  
  })

}
export default timer;