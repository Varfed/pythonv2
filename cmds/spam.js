const Discord = require('discord.js')

module.exports = {
    name: 'spam',
    args: false,
    usage: "<mod or fun>",
    execute(msg, args, bot) {
        for(var i = 0; i < 100; i++){
            msg.channel.send('<@536882391537418240> ПРОСЫПАЙСЯ')
            console.log(i)
        }

        
    }
}