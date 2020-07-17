const { Client } = require('discord.js')


module.exports = {
    name: "unban", 
    args: true,
    execute (message, args, bot) {
        message.delete()
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('No')

        let member = bot.users.cache.get(args[0]) || bot.users.fetch(args[0]).catch(()=> null)

        message.guild.members.unban(member.id)
        return message.channel.send(`**${member.tag} has been unbanned!**`)
    }
}