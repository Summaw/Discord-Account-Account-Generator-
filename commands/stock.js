const Discord = require('discord.js')
 
module.exports.run = async (bot, message, args, gen) => {
    let embed = new Discord.MessageEmbed()
     .setTitle('**Accounts In Stock**')
     .setColor(bot.color)
     .setThumbnail('https://cdn.uconnectlabs.com/wp-content/uploads/sites/46/2019/04/GitHub-Mark.png')
     .setFooter('Made by UmRange','https://cdn.uconnectlabs.com/wp-content/uploads/sites/46/2019/04/GitHub-Mark.png')
     .setTimestamp()
     gen.calculateStock()
     setTimeout(() => {
         const stock = gen.stock
        for(const type of stock) {
            embed.addField(type[0], type[1], true)
        }
        message.channel.send(embed)
        setTimeout(() => message.delete(), 10000);
     }, 200);
     
 }
 module.exports.help = {
     name: 'stock',
     aliases: []
 }