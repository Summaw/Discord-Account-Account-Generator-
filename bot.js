const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config')
const client = new Discord.Client()
const gen = require('./gen.js')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.prefix = config.prefix
client.color = 0x0000
client.cooldown = new Set()
fs.readdir('./commands', (err,files) => {
    if(err) console.error(err)
    let jsfiles = files.filter(file => file.split(".").pop() === 'js')
    if(!jsfiles || jsfiles.legnth <= 0) console.log(`No commands found!`)
    jsfiles.forEach((file,i) => {
        let props = require(`./commands/${file}`)
        if(props.run && props.help.name) {
            client.commands.set(props.help.name, props)
            if(props.help.aliases && Array.isArray(props.help.aliases)) {
                props.help.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name)
                    console.log(`Loaded alias '${alias}' for command ${props.help.name}`)
                })
            }
            console.log(`${i+1}: Loaded command '${props.help.name}'`)
        } else {
            console.log(`Something is missing for file '${file}'!`)
        }
    })
})
client.on('ready', () => {
	console.log(``)
    console.log(`${client.user.tag}`)
	console.log(`Bot is online!`)
	
	
	
	

// set activity
client.user.setActivity(`Generator • Online`, { type: "WATCHING" });
})

client.on('message', message => {
    if(message.author.bot || message.channel.type !== 'text') return
    const prefix = client.prefix
    const messageArray = message.content.split(" ")
    const command = messageArray[0].slice(prefix.length)
    const args = messageArray.slice(1)
    if(!message.content.startsWith(prefix)) return
    let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if(commandfile) commandfile.run(client, message, args, gen)
})

client.login(config.token)