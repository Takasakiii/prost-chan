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