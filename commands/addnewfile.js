const Discord = require('discord.js')
const fs = require('fs')
 module.exports.run = async (bot, message, args, gen) => {
     if(!message.member.hasPermission("Owner")) return message.channel.send({embed:{title:`You don't have permission to use gen!`, color:bot.color}})
     let type = args[0]
     if(!type) return message.channel.send({embed:{title:`Usage: ${bot.prefix}addnewfile <type>`, color:bot.color}})
     fs.writeFileSync(`./alts/${type}.txt`, '', 'utf8', (err) => {if(err) console.log(err)})
     message.channel.send({embed:{title:`Added new file!`, color:bot.color}})
 }
 module.exports.help = {
     name: 'addnewfile',
     aliases: []
 }