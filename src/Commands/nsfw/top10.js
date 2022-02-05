const Command = require("../../Structures/Command")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const Danbooru = require("danbooru")
const { getImage } = require("random-reddit")
const client = require("nekos.life")
const neko = new client()

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

            await interaction.followUp("<a:loading:885888459749855282> | Buscando imagens...")
            for (let i = 0; i < 10; i++) {
               images.push(await getImage("ecchi"))
            }
    
            let embedsArray = []

            let i = 0
            for (const a of images) {
                i++
                embedsArray.push(new MessageEmbed().setTitle(`Imagem ${i}`).setImage(a).setColor("RANDOM"))
            }
    
            return interaction.editReply({
                content: "Aqui está suas 10 imagens <:Smirkie:939589129929367572>",
                embeds: embedsArray
            })

        } else if(interaction.options.getString("options") == "nekos") {

            let images = []
            let embedsArray = []

            await interaction.followUp("<a:loading:885888459749855282> | Buscando imagens...")
            for (let i = 0; i < 10; i++) {
               images.push(await neko.nsfw.nekoGif(), await neko.nsfw.neko())
            }

            let i = 0
            for (const a of images) {
                i++
                embedsArray.push(new MessageEmbed().setTitle(`Imagem ${i}`).setImage(a.url).setColor("RANDOM"))
            }

            return interaction.editReply({
                content: "Aqui está suas 10 imagens <:Smirkie:939589129929367572>",
                embeds: embedsArray.slice(0, 10)
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
                embedsArray.push(new MessageEmbed().setTitle(`Imagem ${i}`).setImage(a.file_url).setColor("RANDOM"))
            }
    
            interaction.followUp({
                content: "Aqui está suas 10 imagens <:Smirkie:939589129929367572>",
                embeds: embedsArray
            })
        }
    }
}