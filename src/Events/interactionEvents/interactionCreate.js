const Event = require("../../Structures/Event")

module.exports = class InteractionEvent extends Event {

    async run(interaction) {

        if (interaction.isCommand()) {

            const command = this.client.commands.get(interaction.commandName) || this.client.commands.get(interaction.options.getSubcommand(false))

            if (command) {

                command.ephemeral ? await interaction.deferReply({ ephemeral: true, fetch: true }) : await interaction.deferReply({ fetch: true })

                if (command.ownerOnly && !this.client.utils.checkOwner(interaction.user.id)) {
                    return await interaction.followUp(":x: | O comando só pode ser usado pelo dono.")
                }

                if (!interaction.inGuild()) {
                    return await interaction.followUp(":x: | Comandos em \"/\" ainda não podem ser usados na DM.")
                }

                if (interaction.inGuild()) {

                    const userPermCheck = command.userPerms || this.client.defaultPerms.add(command.userPerms)
                    if (userPermCheck) {
                        const missing = interaction.channel.permissionsFor(interaction.member).missing(userPermCheck);
                        if (missing.length) {
                            return await interaction.followUp(`:x: | Esta lhe faltando a(s) seguintes permissões para rodar o comando ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))}`)
                        }
                    }

                    const botPermCheck = command.botPerms || this.client.defaultPerms.add(command.botPerms)
                    if (botPermCheck) {
                        const missing = interaction.channel.permissionsFor(this.client.user).missing(botPermCheck)
                        if (missing.length) {
                            return await interaction.followUp(`:x: | Esta me faltando a(s) seguintes permissões para rodar o comando ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))}`)
                        }
                    }
                }

                try {
                    command?.run({ interaction }) ?? interaction.followUp("⚠️ | Eu não encontrei este comando.")
                } catch (e) {
                    return await interaction.followUp(":x: Um erro ocorreu ao rodar o comando\n" + "```js\n" + e + "```")
                }
            }
        }
    }
}