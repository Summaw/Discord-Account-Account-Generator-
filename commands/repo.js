const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
const disbut = require('discord-buttons');
disbut(client);

module.exports.run = async (bot, message, args, gen) => {
  let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://github.com/UmRange')
  .setLabel('My github!')

    message.channel.send('Be sure to check out my github for more cool shit!', button);
  }

module.exports.help = {
name: 'dev',
aliases: []
}
