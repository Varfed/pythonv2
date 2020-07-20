const Discord = require('discord.js')
const { promptMessage } = require("../functions.js");

module.exports = {
    name: 'ban',
    args: true,
    usage: "<user> <reason>",
    async execute (message, args, bot){
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("No.");
        let usr = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        let reason = args[1]




        if(usr === message.author) return message.channel.send('Вы собрались забанить себя?')



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
                .setTitle(`Пользователь ${usr} был успешно забанен! Причина: ${reason}`)

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