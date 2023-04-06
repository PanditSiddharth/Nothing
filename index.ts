/*                                         imports                                                    */
/* ************************************************************************************************** */
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
const input = require('input');
import keep_alive from './keep_alive';
import start from './start';
import dotenv from "dotenv";
import { st } from './strt';
dotenv.config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TOKEN);
const season = process.env.SESSION
const stringSession = new StringSession(season);
const client = new TelegramClient(stringSession, parseInt(process.env.APIID as any),(process.env.APIHASH as string), { connectionRetries: 1 });
keep_alive();

//                                         Client
/* ************************************************************************************************** */

(async () => {
  st()
  await client.start({

    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err)
  });
  console.log("You should now be connected.");


  await client.sendMessage("me", { message: (client.session.save() as any) })

  await start(client, bot)
  try {

    function keepAlive() {
      setTimeout(keepAlive, 500);
    }
    setTimeout(keepAlive, 500);

  } catch (err) {
    console.log(err);
  }
})();

/* ************************************************************************************************** */

(async () => {
  bot.launch();
  console.log("bot is working now");
})()
