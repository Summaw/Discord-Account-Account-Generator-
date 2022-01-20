const Discord = require('discord.js')
module.exports.run = async (bot, message, args, gen) => {
    let embed = new Discord.MessageEmbed()
    .setTitle('Account Gen Commands')
    .setColor(bot.color)
    .setThumbnail('https://cdn.uconnectlabs.com/wp-content/uploads/sites/46/2019/04/GitHub-Mark.png')
    .setDescription('Generator Commands')
    .addField('$help','Shows All Available Commands')
    .addField('$gen (acc type)','Generates An Account')
    .addField('$stock','Shows A List Of All  Accounts in Stock')
    .addField('$dev','Shows Information About The Bot')
    .setFooter('Made by UmRange','https://cdn.uconnectlabs.com/wp-content/uploads/sites/46/2019/04/GitHub-Mark.png')
    .setTimestamp()
       message.channel.send(embed)
       setTimeout(() => message.delete(), 10000);
    }
    
module.exports.help = {
    name: 'help',
    aliases: []
}