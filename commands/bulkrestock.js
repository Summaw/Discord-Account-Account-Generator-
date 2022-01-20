const Discord = require('discord.js')

module.exports.run = async (bot, message, args, gen) => {
    if(!message.member.hasPermission('Owner')) return message.channel.send({embed:{title:`You don't have permission to use this command!`, color:bot.color}})
    let type = args[0]
    let alts = args.slice(1).join(" ").split(' ')
    if(!type || !alts) return message.channel.send({embed:{title:`Usage: ${bot.prefix}restock <type> <alts> (alts split with ,)`, color:bot.color}})
    for(const alt of alts) gen.addAlt(type, alt)
    message.channel.send({embed:{title:`Added ${alts.length} ${type} alts!`, color:bot.color}})
    }
module.exports.help = {
    name: 'bulkrestock',
    aliases: ['addalts']
}