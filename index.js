const { Telegraf } = require('telegraf');
const { exec } = require('child_process');

const bot = new Telegraf(process.env.TOKEN);

bot.command('update', (ctx) => {
  ctx.reply('Updating GitHub repository...');
  exec("cd /home/runner/nothing && git fetch --all && git reset --hard origin/main", async (error, stdout, stderr) => {
    if (error) {
      ctx.reply(`Error updating GitHub repository: ${error.message}`);
      return;
    }
    if (stderr) {
      ctx.reply(`Error updating GitHub repository: ${stderr}`);
      return;
    }
    ctx.reply('GitHub repository updated successfully!');
    ctx.reply('Restarting Replit instance...');
    process.once('SIGINT', () => bot.stop('SIGINT'));
    await process.once('SIGTERM', () => bot.stop('SIGTERM'));
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