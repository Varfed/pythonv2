const { Client } = require('discord.js')
const { promptMessage } = require('../functions.js')

module.exports = {
    name: "unban", 
    args: true,
    async execute (message, args, bot) {
        message.delete()
        if(!message.member.roles.cache.has('733382837268381748')) return message.reply("No.");
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('No')

        let member = bot.users.cache.get(args[0]) || bot.users.fetch(args[0]).catch(()=> null)

        const promptEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`Это сообщение станет не рабочим через 30 секунд.`)
        .setDescription(`Вы хотите разбанить ${member}?`)

        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                message.guild.members.unban(member.id)


                let eSucc = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Пользователь ${member} был успешно разбанен!`)

                message.channel.send(eSucc)

                    .catch(err => {
                        if (err) return message.channel.send(`Well.... the unban didn't work out. Here's the error ${err}`)
                    });

            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Отменено.`)
                    .then(m => m.delete(10000));
            }
        });



    }
}