import bigInt, { BigInteger } from "big-integer";
import { Api, TelegramClient } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { NewMessageEvent } from "telegram/events"
import * as fs from 'fs';
import { sleep } from "../strt";
import Chk from "../helpers/chk";

const clone = async (client: TelegramClient, e: NewMessageEvent, upt: any) => {
    let y = new Chk(client, e);
    try {
        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger
        if (m.message.includes("s") || m.message.includes("save")) {
            const msgg: any = m
            const uidd: any = m.fromId
            const id: any = uidd.userId
            const msg: any = await client.getEntity(uidd.userId)
            const name = msg.firstName + (msg.lastName != null ? ' ' + msg.lastName : '')
            const username = msg.username
            const me = {
                name, username, fromId: { userId: id }, id, firstName: msg.firstName, lastName: msg.lastName
            }

            try {
                let rid = await y.edit("Saving user data.....")
                const buf: any = await client.downloadProfilePhoto(id)

                const dataString = JSON.stringify(me, null, 2);
                fs.writeFileSync('data.txt', dataString);
                if (buf.length > 11) {
                    fs.writeFileSync("./m.png", buf);
                } else {
                    fs.unlinkSync('./m.png')
                }
                return y.edit('Your current state has been stored and previous save deleted', {id: rid.id})

            } catch (error) {
                console.error(error);
            }
            return
        }

        if (m.message.includes('r') || m.message.includes("retrieve")) {
            try {
                const fileData = fs.readFileSync('./data.txt', 'utf-8');
                const me = JSON.parse(fileData);

                let rid = await y.edit("Retriving previous state of name: " + me.firstName, {d: false});

                await sleep(100)
                await y.edit("Updating info.....", { id: rid.id, d: false});
                const relt = await client.invoke(
                    new Api.account.UpdateProfile({
                        firstName: me.firstName,
                        lastName: me.lastName ? me.lastName : '',
                        about: (me.firstName + (me.lastName ? " " + me.lastName : '')),
                    })
                );

                if (me.username != null) {
                    try { await client.invoke(new Api.account.UpdateUsername({ username: me.username + '0' })) } catch (error: any) {
                        try { await client.invoke(new Api.account.UpdateUsername({ username: me.username + '1' })) } catch (r: any) {
                            try { await client.invoke(new Api.account.UpdateUsername({ username: me.username + '456' })) } catch (err) {
                                try { await client.invoke(new Api.account.UpdateUsername({ username: '' })) } catch (eor: any) {
                                    console.log(eor)
                                    // y.edit(eor.message)
                                }
                            }
                        }
                    }
                } else {
                    try { await client.invoke(new Api.account.UpdateUsername({ username: '' }))} catch (eor) {
                        console.log(eor)
                    }
                }
                await sleep(500)
                await y.edit("Removing old pic.....", { id: rid.id, d: false} );
                const result = await client.invoke(
                    new Api.photos.UpdateProfilePhoto({
                        id:
                            new Api.InputPhoto({
                                id: bigInt(),
                                accessHash: bigInt(),
                                fileReference: Buffer.from("arbitrary data here"),
                            }),
                    })
                );
                try {
                    await sleep(200)
                    await y.edit("Uploading new pic....." , { id: rid.id, d: false});
                    const toUpload = new CustomFile("m.png", fs.statSync("./m.png").size, "./m.png");

                    const res = await client.invoke(
                        new Api.photos.UploadProfilePhoto({
                            file: await client.uploadFile({
                                file: toUpload,
                                workers: 1,
                            })
                        })
                    );
                    await sleep(200)
                    y.edit( "Retrieve profile successfull: User " + me.firstName + "\nLogic.B Userbot", { id: rid.id});
                } catch (err) { }

            } catch (error) {
                console.error("r: " + error);
            }
            return
        }

        if(m.replyTo == null){
            let msr : any = m.fromId
            return y.edit("Please reply to user")
        }
        const replied: any = await m.getReplyMessage()
        const me: any = await client.getEntity(replied.fromId.userId)

       let t = await y.edit("Clonning user: " + ((me.username != null) ? "@" + me.username : me.firstName) , { d: false});

        const reult = await client.invoke(
            new Api.messages.SetTyping({
                peer: chatId,
                action: new Api.SendMessageTypingAction(),
                topMsgId: 43,
            })
        );

        await y.edit("Checking user pic....."  , { d: false, id: t.id});
        const buf: any = await client.downloadProfilePhoto(replied.fromId.userId)

        await sleep(1000)
        await y.edit("Updating info....." , { d: false, id: t.id});
        const relt = await client.invoke(
            new Api.account.UpdateProfile({
                firstName: me.firstName,
                lastName: me.lastName ? me.lastName : '',
                about: (me.firstName + (me.lastName ? " " + me.lastName : '')),
            })
        );

        console.log(typeof me.username)
        if (me.username != null) {
            let usrr: string = me.username + '0'
            console.log(typeof (me.username + '1'))
            console.log(typeof (me.username + '456'))

            try { await client.invoke(new Api.account.UpdateUsername({ username: (me.username + '0') })) } catch (error: any) {
                try { await client.invoke(new Api.account.UpdateUsername({ username: (me.username + '1') })) } catch (r: any) {
                    try { await client.invoke(new Api.account.UpdateUsername({ username: (me.username + '456') })) } catch (err) {
                        try { await client.invoke(new Api.account.UpdateUsername({ username: '' })) } catch (eor: any) {
                            console.log(eor)
                            // y.edit(eor.message)

                        }
                    }
                }
            }
        } else {
        try {await client.invoke(new Api.account.UpdateUsername({ username: '' })) } catch (eor) {
                console.log(eor)
            }
        }

        await sleep(500)
        await y.edit("Removing old pic....." , { d: false, id: t.id});
        const result = await client.invoke(
            new Api.photos.UpdateProfilePhoto({ id: new Api.InputPhoto({ id: bigInt(), accessHash: bigInt(), fileReference: Buffer.from("arbitrary data here"), }), })
        );

        if (buf.length > 11) {
            await sleep(200)
            await y.edit("Uploading new pic.....", { d: false, id: t.id});
            fs.writeFileSync("./r.png", buf);
            const toUpload = new CustomFile("r.png", fs.statSync("./r.png").size, "./r.png");

            const res = await client.invoke(
                new Api.photos.UploadProfilePhoto({
                    file: await client.uploadFile({
                        file: toUpload,
                        workers: 1,
                    })
                })
            );
        }
        await sleep(200)
        await y.edit("Clonning successfull: User " + me.firstName + "\nLogic.B Userbot" , { id: t.id});
        await client.deleteMessages(chatId, [454], {revoke: false})
    } catch (error: any) {
        console.log("clone: " + error.message)
    }
}

export default clone