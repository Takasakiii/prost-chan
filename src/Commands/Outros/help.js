const Command = require("../../Structures/Command")
const { MessageEmbed } = require("discord.js")

module.exports = class HelpCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "help",
            category: "Outros",
            description: "Mostra os comandos do bot",
            ownerOnly: false
        })
    }

    async run({ interaction }) {

        const embed = new MessageEmbed()

        if (Math.round(Math.random() * 100) == 69) {

            embed.setAuthor({
                iconURL: interaction.member.displayAvatarURL({ size: 4096, dynamic: true }),
                name: interaction.user.tag
            })
    
            embed.setFooter({
                iconURL: this.client.user.displayAvatarURL({ size: 4096 }),
                text: `${this.client.user.username} Todos os direitos reservados`
            })

            embed.setDescription("Quer ajuda? Procure um psicologo sou uma bot de putaria não psicologa")
            embed.setImage("https://media.discordapp.net/attachments/739693748744618007/753665166033551390/image0.gif")
            return interaction.followUp({ embeds: [embed ]})
        }

        embed.setAuthor({
            iconURL: interaction.member.displayAvatarURL({ size: 4096, dynamic: true }),
            name: interaction.user.tag
        })

        embed.setFooter({
            iconURL: this.client.user.displayAvatarURL({ size: 4096 }),
            text: `${this.client.user.username} Todos os direitos reservados`
        })

        let categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== "Desenvolvedor").map(cmd => cmd.category))

        for (const category of categories) {
            embed.addField(category, this.client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${this.client.settings.prefix}${cmd.name} ${cmd.usage.trim()}\``).join('\n'))
        }

        embed.setColor("RANDOM")

        interaction.followUp({ embeds: [embed ]})
    }
}