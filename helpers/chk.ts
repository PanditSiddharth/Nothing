import { Api, TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep, up } from "../strt"
import { Upt } from "../helpers"
import * as fs from 'fs'
import { getInputEntity, getMe, _selfId } from "telegram/client/users"
import bigInt from "big-integer"


let uptt: any;
export default class Chk {
    client: TelegramClient
    e: NewMessageEvent | any | undefined
    m: Api.Message | undefined

    constructor(client: TelegramClient, e: NewMessageEvent) {
        this.client = client;
        this.e = e;
        this.m = e.message
    }

    async runProgram(lim: any) {
        try {
            console.log("Program started");
            // let id : any = this.m?.peerId 
            // console.log(lim)

            await this.client?.getMessages(await this.chat(), { limit: 100 })
            await this.edit('Initialzed messages: ' + ((1) * 100));

            if (lim > 10)
                lim = 10
            else if (lim < 1) {
                lim = 1
            }
            console.log(lim)

            for (let i = 1; i < lim; i++) {
                await this.client?.getMessages(await this.chat(), { addOffset: 100 * i, limit: 100 * (i + 1) });
                await this.edit('Initialzed messages: ' + ((i + 1) * 100));
                await sleep(3000);
            }

            this.edit('Initialzation completed Now do actions')

            console.log("Program ended");
        } catch (error: any) {
            this.edit(error.message)
        }
    }

    async runWithTimeout(duration: number, lim: any) {
        return Promise.race([
            this.runProgram(lim),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error("Program exceeded time limit and was terminated"));
                }, duration);
            })
        ]);
    }


    innit = async () => {
        try {
            this.edit('Initializing....', { d: false })
            // let id : any = this.m?.peerId || await this.chat()

            let a: any = await this.client.getParticipants(await this.chat(), { limit: 10000 })
            this.edit("initialized participants now initializing messages..", { d: false })
            let lim: any;
            const matches: any = (this.m?.message as string).match(new RegExp(/init [0-9]{1,2}/));
            if (matches) {
                let matchs: any = (matches[0] as string).match(new RegExp(/[0-9]{1,2}/));
                // console.log(matches[0])
                lim = parseInt(matchs[0]) | 1
            }

            await this.runWithTimeout(100000, lim)
                .then(() => console.log("Program completed successfully within time limit"))
                .catch((error) => console.error(error.message));
            this.edit('Initialized !!')

            return a;

        } catch (err: any) {
            console.log(err)
            this.edit(err.message)
        }
    }

    send = async (message: any, mid: any = undefined) => {
        try {
            let idd = mid || undefined
            return await this.client.sendMessage(await this.chat(), { message: message, replyTo: idd, })
        } catch (error: any) {
            console.log(error.message)
        }
    }

    edit = async (msg: any, { id = false, d = true, rid = false, e = false }: any = {}): Promise<any> => {
        try {
            let idd = id || this.m?.id

            let rmsg: any;
            if (this.m?.out == true || id) {
                rmsg = await this.client.editMessage(await this.chat(), { message: idd, text: msg })
            }
            else {
                if (rid) {
                    rmsg = await this.send(msg, rid)
                }
                else {
                    await this.m?.delete()
                    rmsg = await this.send(msg)
                }
            }
            if (d)
                this.del(rmsg)
            return rmsg
        } catch (error: any) {
            console.log(error.message)

        }
    }

    chat: any = async () => {
        if (this.m?.isPrivate) {
            return await this.m?.getInputChat()
        } else {
            return this.m?.peerId
        }
    }

    isAdmin = async (m?: any) => {
        try {
            if (this.m?.isChannel) {
                let user = m?.fromId || _selfId(this.client)
                let lt = await this.client.invoke(
                    new Api.channels.GetParticipant({
                        channel: this.m?.peerId,
                        participant: user,
                    })
                )

                if (lt.participant.className == "ChannelParticipantCreator" || lt.participant.className == "ChannelParticipantAdmin") {
                    // return lt;
                    return undefined;
                }
            } else {
                this.edit('This command is group/channels specific')
                return undefined;
            }
        } catch {
            this.edit('Error in isAdmin: Chk')
            return undefined;
        }
    }

    v = {
        id: undefined,
        all: undefined,
        d: undefined,
        mt: undefined,
    }
    gpchk = async ({ id, all, d, mt, umt, bn, ubn, pmt }: any = {}) => {
        try {
            if (!this.m?.isChannel) {
                this.edit('This command is group/channels specific')
                return false
            }

            let user = id || _selfId(this.client)

            let lt = await this.client.invoke(
                new Api.channels.GetParticipant({
                    channel: this.m?.peerId,
                    participant: user,
                })
            )

            if (!lt) {
                // lt = await this.client.invoke(
                //     new Api.users.GetFullUser({
                //         id: user,
                //     })
                // )
                return 'ngp'
            }

            if (lt.participant.className == "ChannelParticipantCreator" || lt.participant.className == "ChannelParticipantAdmin") {
                await this.edit('User is admin')
                return false
            }

            if (lt.participant) {
                let o: any = lt.participant
                let r: any = o.bannedRights;
                if (r.sendMessages == true && mt) {
                    this.edit('User is Muted already')
                    return false
                } else if (umt) {
                    return true;
                } else if (ubn) {
                    return true;
                }

                console.log(lt)
                return true;
            } else if (umt) {
                this.edit('User is unmuted already')
                return false
            } else if (ubn) {
                this.edit('User is unbanned already')
                return false
            }

            return true
        } catch (err: any) {
            console.log(err.message)
            this.edit('Error in gpchk: Chk')
            return undefined;
        }
    }

    gperr = async (msg: any) => {

        if (msg.includes('USER_ADMIN_INVALID'))
            return await this.edit(`User is admin`)

        if (msg.includes('MSG_ID_INVALID'))
            return await this.edit(`Invalid message ID provided`)

        if (msg.includes('INPUT_USER_DEACTIVATED'))
            return await this.edit(`The specified user was deleted`)

        if (msg.includes('CHAT_ADMIN_REQUIRED'))
            return await this.edit(`You must be an admin with ban permission to do this`)

        if (msg.includes('PEER_ID_INVALID'))
            return await this.edit(`The provided peer id is invalid`)

        if (msg.includes('USER_ID_INVALID'))
            return await this.edit(`The provided user ID is invalid`)

        if (msg.includes('CHANNEL_PRIVATE'))
            return await this.edit(`You haven't joined this channel/supergroup`)

        if (msg.includes('CHANNEL_INVALID'))
            return await this.edit(`The provided channel is invalid`)

        if (msg.includes('CHAT_WRITE_FORBIDDEN'))
            return await this.edit(`You can't write in this chat`)

        if (msg.includes('PARTICIPANT_ID_INVALID'))
            return await this.edit(`Error: Seems you are doing it to self`)

        return undefined
    }

    chk = async () => {
        try {

            let cmd: number, user: any;
            if ((up() as any ).strt == '/') {
                cmd = 1;
            } else {
                cmd = 0;
            }

            const matches = (this.m?.message as string).match(new RegExp(/[0-9]{9,11}/));
            if (matches) {
                try {
                    user = bigInt(matches[0])
                    console.log(await getInputEntity(this.client, user))
                    //   console.log(await this.client.getEntity(1643271211))
                } catch (error) {
                    await this.innit()
                    console.log(error)
                }
                // await this.client.getParticipants(this.chat)
            }

            /* ************************************************************************* */

            else if (this.m?.entities) {
                const me: any = this.m.entities
                /* ************************************************************************* */

                if (me[cmd].className == "MessageEntityMentionName")
                    user = me[cmd].userId

                /* ************************************************************************* */

                else if (me[cmd].className == "MessageEntityMention") {
                    let metch: any = (this.m?.message as string).match(new RegExp(/@[A-Za-z1-9_]+/));
                    user = metch[0]
                }

                /* ************************************************************************* */

                else {
                    this.edit("Please enter correct id")
                }
            }

            /* ************************************************************************* */

            else if (this.m?.replyTo != null) {
                try {
                    const replied: any = await this.m?.getReplyMessage()
                    user = replied.fromId.userId
                } catch (err: any) {
                    console.log('mention: ' + err.message)
                    return undefined;
                }

                /* ************************************************************************* */

            } else {
                this.edit('Please give any user preference')
            }

            // const result = await this.client.invoke(
            //     new Api.channels.GetParticipant({
            //         channel: this.m?.peerId,
            //         participant: user,
            //     }))

            return user

        } catch (error: any) {
            console.log("CHK: " + error.message)
        }
    }

    dtm = async () => {
        let tm;
        const matcd = (this.m?.message as string).match(new RegExp(/[ ]\d{1,3}[ ]{0,1}[mMdsShHyYwW]/))
        if (matcd) {
            let num: any = matcd[0].match(new RegExp(/[0-9]{1,3}/))
            let tm1: any = matcd[0].match(new RegExp(/[mMdsShHyYwW]/))
            let nm = parseInt(num[0])
            let tmm = tm1[0]
            if (tmm == 's' || tmm == 'S') {
                tm = nm
            }
            else if (tmm == 'm')
                tm = nm * 60
            else if (tmm == 'h' || tmm == 'H')
                tm = nm * 60 * 60
            else if (tmm == 'd')
                tm = nm * 60 * 60 * 12
            else if (tmm == 'D')
                tm = nm * 60 * 60 * 24
            else if (tmm == 'w' || tmm == 'W')
                tm = nm * 60 * 60 * 24 * 7
            else if (tmm == 'M')
                tm = nm * 60 * 60 * 24 * 30
            else if (tmm == 'y' || tmm == 'Y')
                tm = nm * 60 * 60 * 24 * 365

            console.log(matcd)

            return tm
        }

    }


    setdel = async () => {
        const dt = await this.dtm()

        if (dt) {
            const dataString = JSON.stringify({ t: dt }, null, 2);
            fs.writeFileSync('./helpers/setdel.txt', dataString);
            const matcd: any = (this.m?.message as string).match(new RegExp(/[ ]\d{1,3}[ ]{0,1}[mMdsShHyYwW]/))
            this.edit("deleting message time has been set to:" + matcd[0])
        } else {
            this.edit("deleting message time has not set")
        }
    }

    del = (res: any = -1) => {

        let s: any;
        if (res == -1)
            s = this.m?.id
        else
            s = res.id

        const fileData = fs.readFileSync('./helpers/setdel.txt', 'utf-8');
        const me = JSON.parse(fileData);
        sleep(1000 * me.t).then(() => {
            const chatId = this.m?.chatId as import("big-integer").BigInteger
            this.client.deleteMessages(chatId, [s], {})
        })
    }
}

