require('dotenv').config()

const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.TOKEN);

const helpMessage = `
Say Something to me
/start - start the bot
/help - command reference
/echo - say "You said echo"
/echo <msg> - echo a message
`
bot.use((ctx, next) => {

    if (ctx.updateSubTypes[0] == "text"){
        msg = ctx.from.first_name + " said: " + ctx.message.text;
        bot.telegram.sendMessage("-482290479", msg)
    } else {
        msg = ctx.from.first_name + " send " + ctx.updateSubTypes[0]
        bot.telegram.sendMessage("-482290479", msg);
    }
    next();
})

bot.start((ctx) => {
    ctx.reply("Hi I am echo bot!");
    ctx.reply(helpMessage);
})

bot.help((ctx) => {
    ctx.reply(helpMessage);
})

bot.command("echo", (ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(' ');

    let message = "";
    if (inputArray.length == 1) {
        message = "You said echo";
    }
    else {
        inputArray.shift()
        message = inputArray.join(" ")
    }
    ctx.reply(message);
})



bot.launch()