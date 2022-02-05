const Command = require("../../Structures/Command")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const Danbooru = require("danbooru")
const { getImage } = require('random-reddit')

module.exports = class Top10Command extends Command {
    constructor(...args) {
        super(...args, {
            name: "top10",
            category: "NSFW",
            description: "Mostra imanges NSFW/SFW de sua escolha",
            usage: "top10 | cosplay | nekos ( SFW | NSFW ) | bikini ( SFW | NSFW ) | pussy_juice | yaoi | ecchi | anal",
            ownerOnly: false
        })
    }

    async run({ interaction }) {

        if (interaction.options.getString("options") == "ecchi") {

            let images = []
            for (let i = 0; i < 10; i++) {
               images.push(await getImage("ecchi"))
            }
    
            let embedsArray = []
            let i = 0
            for (const a of images) {
                i++
                embedsArray.push(new MessageEmbed().setTitle(`Imagem ${i}`).setImage(a))
            }
    
            return interaction.followUp({
                content: "Aqui está suas 10 imagens <:Smirkie:939589129929367572>",
                embeds: embedsArray
            })

        } else {

            const booru = new Danbooru()

            const posts = await booru.posts({ 
                tags: interaction.options.getString("options"),
                limit: 10
            })
    
            let embedsArray = []
    
            let i = 0
            for (const a of posts) {
                i++
                embedsArray.push(new MessageEmbed().setTitle(`Imagem ${i}`).setImage(a.file_url))
            }
    
            interaction.followUp({
                content: "Aqui está suas 10 imagens <:Smirkie:939589129929367572>",
                embeds: embedsArray
            })
        }
    }
}