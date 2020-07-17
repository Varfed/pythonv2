const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    args: true,
    usage: "<user> <reason>",
    execute (message, args, bot){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("No.");
        let usr = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        let reason = args[1]

        usr.send('Вы были изгнаны из сервера!')
        usr.kick({
            reason: reason
        })
        .then(()=> {
            message.channel.send('**Kick is successful!**')
        })
        .catch(err => {
            message.reply(err.message)
        })
    }
}