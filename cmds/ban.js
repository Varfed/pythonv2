const Discord = require('discord.js')

module.exports = {
    name: 'ban',
    args: true,
    execute (message, args, bot){
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("No.");
        let usr = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        let reason = args[1]

        usr.send('**Вы были забанены на сервере Python**')
        usr.ban({
            reason: reason
        })
        .then(()=> {
            message.channel.send('**Ban is successful!**')
        })
        .catch(err => {
            message.reply(err.message)
        })
    }
}