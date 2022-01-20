const fs = require('fs');
const config = require('./config.json');
module.exports = {
    getAlt: (type) => {
        if(!fs.existsSync(`./alts/${type}.txt`)) return '';
        else {
            let alts = module.exports.readFile(type).filter(r => r!=='');
            let rnd = Math.floor(Math.random() * alts.length);
            return alts[rnd]
        }
    },
    addAlt: (type, alt) => {
        if(!fs.existsSync(`./alts/${type}.txt`)) return
        else {
            fs.appendFile(`./alts/${type}.txt`, `${alt}\n`, 'utf8', (err) => {if(err) console.log(err)})
        }
    },
    removeAlt: (type, alt) =>{
        if(!fs.existsSync(`./alts/${type}.txt`)) return
        else {
            let alts =  module.exports.readFile(type);
            alts = alts.filter(r => r !== alt);
            alts = alts.filter(r => r !== '');
            module.exports.saveFile(type,alts)
        }
    },
    readFile: (type) => {
        if(!fs.existsSync(`./alts/${type}.txt`)) return [];
        else {
            let text = fs.readFileSync(`./alts/${type}.txt`, 'utf8');
            return text.split('\n').filter(r => r!=='')
        }
    },
    saveFile: (type, alts) => {
        if(!fs.existsSync(`./alts/${type}.txt`)) return
        else {
            let list = ``;
            for(const alt of alts) list+=`${alt}\n`;
            fs.writeFileSync(`./alts/${type}.txt`, list, 'utf8', (err) => {if(err) console.log(err)})
        }
    },
    getAllowedRoles: () => {
        let roleIds = config.allowedRoles;
        return roleIds
    },
    getAllowedChannels: () => {
        let channelsIds = config.allowedChannels;
        return channelsIds
    },
    getAllowedFreeChannels: () => {
        let channelsIds = config.allowedFreeChannels;
        return channelsIds
    },
    hasAccess: (member) => {
        let access = false;
        member.roles.forEach(role => {
            if(module.exports.getAllowedRoles().includes(role.id)) access = true
        });
        if(access) return true;
        else return false
    },
    allowedChannel: (channel) => {
        if(module.exports.getAllowedChannels().includes(channel.id)) return true;
        else return false
    },
    allowedFreeChannel: (channel) => {
        if(module.exports.getAllowedFreeChannels().includes(channel.id)) return true;
        else return false
    },
    calculateStock: async () => {
        fs.readdir('./alts', (err, files) => {
            if(err) return console.log(err);
            module.exports.stock = [];
            files.forEach((file, i) => {
                let type = file.split('.')[0];
                let number = module.exports.readFile(type).length;
                module.exports.stock[i] = [type, number]
            });
        })
    }
};