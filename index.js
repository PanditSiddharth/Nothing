const { Telegraf } = require('telegraf');
const { exec } = require('child_process');

const bot = new Telegraf(process.env.TOKEN);
bot.command("yo", (ctx) => ctx.reply("yo++"))
bot.command("yoo", (ctx) => ctx.reply("yo++ hehe"))
bot.command("lol", (ctx) => ctx.reply("yo++ hehe"))
bot.command('update', (ctx) => {
  ctx.reply('Updating GitHub repository...');
  exec("cd ./ && git fetch --all && git reset --hard origin/main", async (error, stdout, stderr) => {
    if (error) {
      ctx.reply(`Error GitHub repository: ${error.message} \nPlease try one time more`);
      return;
    }
    if (stderr) {
      ctx.reply(`STDError updating GitHub repository: ${stderr} \nPlease try one time more`);
      return;
    }
    ctx.reply('GitHub repository updated successfully!');
    
    exec('pm2 stop all', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error stopping processes: ${err}`);
    return;
  }
  console.log('All processes stopped');

    await sleep(5000)
    ctx.reply('Restarting Replit instance...');
    // bot.stop('SIGINT')
    // bot.stop('SIGTERM')
    exec('node index', (error, stdout, stderr) => {
      if (error) {
        ctx.reply(`Error restarting Replit instance: ${error.message}`);
        return;
      }
      if (stderr) {
        ctx.reply(`Error restarting Replit instance: ${stderr}`);
        return;
      }
      ctx.reply('Replit instance restarted successfully!');
    });
  });
});

bot.launch();
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
