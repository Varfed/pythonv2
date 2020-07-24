const Discord = require('discord.js')

module.exports = {
    name: 'warn',
    args: true,
    execute(message, args, bot) {
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
        if (!message.member.roles.cache.has('733382837268381748')) {
            return message.reply("❌ У тебя нету прав банить!")
                .then(m => m.delete(5000));
        
        }

        let usr = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        // No member found
        if (!usr) {
            return message.reply("Пользователь не найден.")
                .then(m => m.delete(5000));
        }

        // // Can't ban urself
        // if (usr.id === message.author.id) {
        //     return message.reply("Аферист? Зачем себя варнить?")
        //         .then(m => m.delete(5000));
        // }

        const wEM = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Предупреждение")
        .setDescription("После трех предупреждений возможен бан!")
        .addField('Причина', reason)

        usr.send(wEM)
        

        let wchan = bot.channels.cache.get('735932469789982820')
        wchan.send(`${usr.user.username} получил варн за: ${reason}.`)
    }
}