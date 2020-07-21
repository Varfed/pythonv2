const Discord = require('discord.js')
const { promptMessage } = require("../functions.js");

module.exports = {
    name: 'ban',
    args: true,
    usage: "<user> <reason>",
    async execute (message, args, bot){

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return message.reply("Укажи кого забанить.")
                .then(m => m.delete(5000));
        }

        // No reason
        let reason = args.slice(1).join(" ")
        if(reason=='' || reason==null){
            reason = "Не указано"
        }

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ У тебя нету прав банить!")
                .then(m => m.delete(5000));
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ У меня нет прав банить пользователей.")
                .then(m => m.delete(5000));
        }
        let usr = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        // No member found
        if (!usr) {
            return message.reply("Пользователь не найден.")
                .then(m => m.delete(5000));
        }

        // Can't ban urself
        if (usr.id === message.author.id) {
            return message.reply("Аферист? зачему себе банить?")
                .then(m => m.delete(5000));
        }

        // Check if the user's banable
        if (!usr.bannable) {
            return message.reply("Я не могу его забанить, его роль лучше моей")
                .then(m => m.delete(5000));
        }


        // usr.ban({
        //     reason: reason
        // })
        // .then(()=> {

        // })
        // .catch(err => {
        //     message.reply(err.message)
        // })

        const promptEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`Это сообщение станет не рабочим через 30 секунд.`)
        .setDescription(`Вы хотите забанить ${usr}?`)

        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                usr.ban({
                    reason: reason
                })

                usr.send(`**Вы были забанены на сервере Python. Причина: ${reason} **`)


                let eSucc = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Пользователь ${usr.user.username} был успешно забанен! Причина: ${reason}`)

                message.channel.send(eSucc)

                    .catch(err => {
                        if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`)
                    });

            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Отменено.`)
                    .then(m => m.delete(10000));
            }
        });
    }
}