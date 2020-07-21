const Discord = require('discord.js')
const { promptMessage } = require("../functions.js");

module.exports = {
    name: 'kick',
    args: true,
    async execute (message, args, bot){

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return message.reply("Укажи кого кикнуть.")
                .then(m => m.delete(5000));
        }

        // No reason
        let reason = args.slice(1).join(" ")
        if(reason=='' || reason==null){
            reason = "Не указано"
        }

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ У тебя нету прав кикать!")
                .then(m => m.delete(5000));
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ У меня нет прав кикать пользователей.")
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
            return message.reply("Аферист? Зачем себе кикать?")
                .then(m => m.delete(5000));
        }

        // Check if the user's banable
        if (!usr.bannable) {
            return message.reply("Я не могу его кикнуть, его роль лучше моей")
                .then(m => m.delete(5000));
        }
        const promptEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`Это сообщение станет не рабочим через 30 секунд.`)
        .setDescription(`Вы уверены что хотите изгнать ${usr}?`)

        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                usr.kick({
                    reason: reason
                })

                usr.send(`**Вы были изгнаны с Python. Причина: ${reason} **`)

                let eSucc = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Пользователь ${usr.user.username} был успешно изгнан! Причина: ${reason}`)

                message.channel.send(eSucc)

                    .catch(err => {
                        if (err) return message.channel.send(`Well.... the kick didn't work out. Here's the error ${err}`)
                    });

            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Отмена`)
                    .then(m => m.delete(10000));
            }
        });
    }
}