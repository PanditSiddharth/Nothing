import { Markup } from "telegraf";
import { TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events";

const settings = (client: TelegramClient, e: NewMessageEvent, bot: any) => {
// // Create an inline keyboard
// const inlineKeyboard = Markup.inlineKeyboard([[{text: "text", callback_data: "1"}]]);
// // Start command handler
// bot.on('message', (ctx : any, next: any) => {
//   // Send a message with the inline keyboard
//   ctx.reply('Hello!', inlineKeyboard);
//   next()
// });

// // Callback query handler
// bot.action('1', (ctx: any) => {
//   // Respond to the callback query
// //   ctx.answerCallbackQuery('You clicked the button!');
// });

// bot.on('inline_query', async (ctx: any) => {
//     const query = ctx.inlineQuery.query;
//     if (!query) {
//       return;
//     }
  
//     const results = [
//       {
//         type: 'article',
//         id: '1',
//         title: 'Button 1',
//         description: 'Description for Button 1',
//         input_message_content: {
//           message_text: 'You chose Button 1',
//         },
//         reply_markup: {
//           inline_keyboard: [
//             [
//               { text: 'Option A', callback_data: 'option_1' },
//               { text: 'Option B', callback_data: 'option_2' },
//             ],
//           ],
//         },
//       }
//     ];

// // Main menu with buttons
// const mainMenu = {
//     inline_keyboard: [
//       [{ text: 'Option 1', callback_data: 'option_1' }],
//       [{ text: 'Option 2', callback_data: 'option_2' }],
//     ],
//   };
  
//   // Callback query handler
//   bot.on('callback_query', (ctx: any) => {
//     const data = ctx.callbackQuery.data;
  
//     // Handle button clicks
//     if (data === 'option_1') {
//       // Update the buttons and send a new message
//       const newMenu = {
//         inline_keyboard: [
//           [{ text: 'Suboption 1', callback_data: 'suboption_1' }],
//           [{ text: 'Suboption 2', callback_data: 'suboption_2' }],
//         ],
//       };
//       ctx.editMessageText('You selected Option 1', {
//         reply_markup: newMenu,
//       });
//     } else if (data === 'option_2') {
//       // Update the buttons and send a new message
//       const newMenu = {
//         inline_keyboard: [
//           [{ text: 'Suboption 3', callback_data: 'suboption_3' }],
//           [{ text: 'Suboption 4', callback_data: 'suboption_4' }],
//         ],
//       };
//       ctx.editMessageText('You selected Option 2', {
//         reply_markup: newMenu,
//       });
//     } else {
//       // Handle suboption clicks
//       ctx.answerCallbackQuery(`You selected ${data}`);
//     }
//   });
  
//   bot.on('message', (ctx : any, next: any) => {
//     // Send a message with the inline keyboard
//     ctx.reply('Main Menu', {
//         reply_markup: mainMenu,
//       });
//     next()
//   });


// //   // Start command handler
// //   bot.start((ctx: any) => {
// //     // Send the main menu
// //     ctx.reply('Main Menu', {
// //       reply_markup: mainMenu,
// //     });
// //   });
  
//     ctx.answerInlineQuery(results);
//   });
  }

  export default settings