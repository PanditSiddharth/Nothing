import { Context, Markup } from "telegraf";
import { Api, TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events";
const { Button } = require("../node_modules/telegram/tl/custom/button");
import Chk from "../helpers/chk";

const helpb = (bot: any) => {
    // Create an inline keyboard

    const inlineKeyboard = Markup.inlineKeyboard([[{ text: "text", callback_data: "1" }]]);

    bot.on('inline_query', async (ctx: Context) => {
        const query: any = (ctx.inlineQuery as any).query;
        if (!query) {
            return;
        }

        try {
            const results: any = [
                {
                    type: 'article',
                    id: '1',
                    title: 'Help',
                    description: 'Help commands of Logic.B userbot',
                    input_message_content: {
                        message_text: 'This is help buttons of Logic.B userbot for more You can see to contact dev option',
                    },
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Admin Commands', callback_data: "adm" },
                                { text: 'Tools', callback_data: "too" },
                            ],
                            [
                                { text: 'Arts', callback_data: "art" },
                                { text: 'helpers', callback_data: "hel" },
                            ],
                            [
                                { text: 'Contact Developer', callback_data: "dev" },
                            ]
                        ],
                    },
                }
            ];

            // Callback query handler
            bot.on('callback_query', (ctx: Context) => {
                const data = (ctx.callbackQuery as any).data;
                // console.log(ctx.callbackQuery)

                const newMenu = {
                    inline_keyboard: [
                        [{ text: 'Back', callback_data: 'back' }],
                        [{ text: 'Close', callback_data: 'close' }],
                    ],
                };



                // Handle button clicks
                if (data === 'adm') {
                    try {
                        // Update the buttons and send a new message
                        ctx.editMessageText(`𝐆𝐫𝐨𝐮𝐩 𝐀𝐝𝐦𝐢𝐧 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬: 

*𝐛𝐚𝐧 to ban users
*𝐦𝐮𝐭𝐞 to mute users
*𝐮𝐧𝐦𝐮𝐭𝐞 to unmute users
*𝐮𝐧𝐛𝐚𝐧 to unban users
*𝐤𝐢𝐜𝐤 to kick users`, {
                            reply_markup: newMenu,
                        });
                    } catch (error: any) {
                        console.log(error.message);
                    }

                } else if (data === 'close') {
                    try {
                        // bot.telegram.deleteMessage(ctx.callbackQuery?.inline_message_id)
                        ctx.answerCbQuery("it is not implemented now")
                    } catch (error: any) {
                        console.log(error.message);
                    }
                }
                else if (data === 'too') {
                    try {
                        // Update the buttons and send a new message
                        ctx.editMessageText(`𝐇𝐞𝐥𝐩: 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐢𝐧 𝐔𝐬𝐞𝐫𝐛𝐨𝐭

*𝐡𝐞𝐥𝐩 to see help
*𝐩𝐢𝐧𝐠 to see uptime(status)
*𝐤𝐢𝐥𝐥 to make animation text
*𝐢𝐧𝐢𝐭 to initialize useridies
*𝐬𝐞𝐭𝐝𝐞𝐥 to set auto deletion time
*𝐜𝐥𝐨𝐧𝐞 to clone users profile
    *𝐜𝐥𝐨𝐧𝐞 𝐬 to save current profile
    *𝐜𝐥𝐨𝐧𝐞 𝐫 to retrive saved`, {
                            reply_markup: newMenu,
                        });


                    } catch (error: any) {
                        console.log(error.message);
                    }
                } else if (data === 'art') {
                    try {
                        // Update the buttons and send a new message
                        ctx.editMessageText(`
Art commands: 

*ping uptime
*kill killing animation
                `, {
                            reply_markup: newMenu,
                        });
                    } catch (error: any) {
                        console.log(error.message);
                    }
                } else if (data === 'hel') {
                    try {
                        // Update the buttons and send a new message
                        ctx.editMessageText(`
𝐔𝐬𝐞 𝐭𝐢𝐦𝐞𝐬 𝐢𝐧 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬:

second:s or S  minute:m  
Hour: h or H
12hour: d  24hour: D
weak: w or W
month: M   Year: y or Y
`, {
                            reply_markup: newMenu,
                        });
                    } catch (error: any) {
                        console.log(error.message);
                    }
                } else if (data === 'dev') {
                    try {
                        // Update the buttons and send a new message
                        ctx.editMessageText(`

@Dev Developer: @PanditSiddharth
@Con Contact @LogicB_Support
                `, {
                            reply_markup: newMenu,
                        });
                    } catch (error: any) {
                        console.log(error.message);
                    }
                }
                else if (data === 'back') {
                    // Update the buttons and send a new message
                    try {
                        ctx.editMessageText(`
This is help buttons of Logic.B userbot for more You can see to contact dev option
                `, {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: 'Admin Commands', callback_data: "adm" },
                                        { text: 'Tools', callback_data: "too" },
                                    ],
                                    [
                                        { text: 'Arts', callback_data: "art" },
                                        { text: 'helpers', callback_data: "hel" },
                                    ],
                                    [
                                        { text: 'Contact Developer', callback_data: "dev" },
                                    ]
                                ],
                            },
                        });

                    } catch (error: any) {
                        console.log(error.message);
                    }
                }

                else {
                    ctx.reply("You selected Lol option")
                }
            });



            // bot.on('message', (ctx: any, next: any) => {
            //     // Send a message with the inline keyboard
            //     ctx.reply('Main Menu', {
            //         reply_markup: mainMenu,
            //     });
            //     next()
            // });


            //   // Start command handler
            //   bot.start((ctx: any) => {
            //     // Send the main menu
            //     ctx.reply('Main Menu', {
            //       reply_markup: mainMenu,
            //     });
            //   });
            ctx.answerInlineQuery(results);
        } catch (error) {

        }

    });
}

export default helpb

export const hlp = async (client: TelegramClient, e: NewMessageEvent) => {
    try {
        const m: Api.Message = e.message
        let y = new Chk(client, e)
        const resut: Api.messages.BotResults = await client.invoke(
            new Api.messages.GetInlineBotResults({
                bot: "@node231bot",
                peer: await y.chat(),
                query: "help",
                offset: "@node231bot ",
                geoPoint: new Api.InputGeoPoint({
                    lat: 8.24,
                    long: 8.24,
                    accuracyRadius: 5,
                }),
            })
        );

        const result2: any = await client.invoke(
            new Api.messages.SendInlineBotResult({
                peer: await y.chat(),
                // randomId: resut.results[0].id,
                queryId: resut.queryId,
                id: resut.results[0].id,
                hideVia: true,
                scheduleDate: 0,
                // sendAs: "gif",
            })
        );

        //   console.log(result2.updates[2].message)
        //   let med: any = result2.updates[2].message.media

    } catch (error: any) {
        console.log("hlp: " + error.message)
    }
}
