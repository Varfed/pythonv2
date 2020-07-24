const Discord = require('discord.js')

module.exports = {
    name: 'say',
    args: true,
    execute(msg, args, bot) {
        let arg = args.slice(0).join(" ")

        msg.channel.send(arg)
        
    }
}