
const path = require("path")
const engines = require(path.resolve(__dirname,"engines.js"))
const {RichEmbed} = require("discord.js")

function toEmbed(string){

    let source = string + "$"
    
    const embed = {}
    const logs = []

    for(type in engines){

        const match = Array.from(engines[type].regex[Symbol.matchAll](source), match => Array.from(match))
        const element = engines[type].toJSON(match)
        
        if(engines[type].filter(element)){
            embed[type] = element
            logs.push("[ Valid ] "+type)
        }else{
            logs.push("[ Error ] "+type)
        }
    }

    const richEmbed = new RichEmbed(embed)
        .setImage(embed.image)
        .setThumbnail(embed.thumbnail)

    return {
        logs : logs.join("\n"),
        embed : richEmbed
    }
}

module.exports = toEmbed