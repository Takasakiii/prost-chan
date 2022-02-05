const Command = require("../../Structures/Command")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const axios = require("axios")

module.exports = class Top10Command extends Command {
    constructor(...args) {
        super(...args, {
            name: "top10",
            category: "NSFW",
            description: "Mostra imanges NSFW/SFW de sua escolha",
            usage: "top10 | cosplay | nekos ( SFW | NSFW ) | bikini ( SFW | NSFW ) | pussy_juice | lolicon ( Call 190 ) | yaoi | ecchi | anal | real",
            ownerOnly: false
        })
    }

    async run({ interaction }) {

    }
}