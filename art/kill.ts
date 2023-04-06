import { Api, TelegramClient } from "telegram";
import { sleep, Upt } from "../strt";
import Chk from "../helpers/chk";

const kill = async (client: TelegramClient, e: any, upt: Upt) => {
  // console.log(m.peerId)
  const m = e.message
  try {
    const y = new Chk(client, e)
    let id = await y.chk()

    let space: any = 'ㅤ'
    let arrow: any = `>---->`
    let len: any = 5
    let gun: any = `(　-_･) ︻デ═一`
    let per: any = `(/❛o❛)/ `
    let gn: any = `︻デ═一`
    let yo: any;
    let first: any;

    try {
      yo = await client.getEntity(id)
      first = yo.firstName
    } catch (error) {
      first = 'Lol'
    }


    // await sleep(1000)
   let mm: any = await y.edit(`
${gun + arrow + space + space + space + per}

  Killing to ${first}
`, { d: false })

    await sleep(1000)

   mm = await y.edit(`
${gn + space + space + arrow + space + space + per}

  Killing to ${first}
`, { id : mm.id})

    await sleep(1000)

  mm = await y.edit(`
${gn + space + space + space + arrow + space + space + per}

  Killing to ${first}
`, { id: mm.id })
    await sleep(1000)

    mm = await y.edit(`
${gn + space + space + space + space + arrow + space + per}

  Killing to ${first}
`, {id: mm.id})
    await sleep(1000)

   mm = await y.edit(`
${gn + space + space + space + space + space + arrow + per}

  Killed Lol ${(first == 'Lol' ? '' : first)} ⚔️
`, {id: mm.id})

    // await y.edit(`
    // >------>
    // `)



  } catch (err) { console.log(err) }

}
export default kill
