const Discord = require('discord.js')
const { prefix } = require('../settings.json')

module.exports = {
    name: 'help',
    args: true,
    usage: "<mod or fun>",
    execute(msg, args, bot) {
        if(args[0] == 'mod'){
            console.log('hi')
        } else if (args[0] == 'fun') {
            console.log('bye')
        }
    }
}