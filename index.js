const discord = require('discord.js'), client = new discord.Client(), fs = require('fs'), Discord = require('discord.js')

client.on('ready', () => {
  client.user.setActivity('.stock | Made By UmRange => 🌺', { type: "STREAMING" }) //edit the text for rpc to what ever you would like.
})
client.on('ready', () => {
  console.log(`${client.user.tag} is now online!`)
})
const config = require('./config.json')
let footer = config.footer;

const cooldowns = new Discord.Collection();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}
let prefix = config.prefix;
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!commandName) return;

  if (!command) return;
  if (!message.guild) return;


  command.execute(message, args, client);
});

const { DiscordTicket } = require('discord_ticket_maker')
const ticket = new DiscordTicket()


client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.startsWith(`${prefix}t-role`) || message.content.startsWith(`${prefix}role`)) {
    const role = message.mentions.roles.first()

    ticket.setRole(message, role) //Set the support role, that gets pinged when a new ticket is created!
  }
  if (message.content.toLowerCase().startsWith(`${prefix}ticket`) || message.content.toLowerCase().startsWith(`${prefix}new`)) {
    const reason = message.content.slice(7)

    ticket.makeTicket(message, reason, "swrf")//Creates a new ticket, the reason is optional!
  }
  if (message.content.toLowerCase().startsWith(`${prefix}close`)) {
    const args = message.content.slice(6)
    const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id == args || c.name == args) || message.channel

    ticket.closeTicket(message, channel)
  }
  if (message.content.startsWith(`${prefix}embed-message`)) {
    const args = message.content.slice(14)
    

    ticket.editEmbed(message, args)
  }
})




client.login(config.botToken)
