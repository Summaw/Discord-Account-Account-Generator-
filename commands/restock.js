const Discord = require('discord.js')

module.exports.run = async (bot, message, args, gen) => {
    if(!message.member.hasPermission('Owner')) return message.channel.send({embed:{title:`You don't have permission to use this command!`, color:bot.color}})
    let type = args[0]
    let alt = args[1]
    if(!type || !alt) return message.channel.send({embed:{title:`Usage: ${bot.prefix}restock (type) (alt)`, color:bot.color}})
    gen.addAlt(type, alt,)
    message.channel.send({embed:{title:`Added ${type} accounts!`, color:bot.color}})
    }
module.exports.help = {
    name: 'restock',
    aliases: ['addalt']
}