import Command from "../../Structures/Command.js"


export default class PingCommand extends Command {
    constructor(...args) {
        super(...args, {
            name: "ping",
            category: "Outros",
            ownerOnly: false,
            ephemeral: true
        })
    }

    async run({ interaction }) {

        let msg = await interaction.followUp("💦")

        let tLatency = msg.createdTimestamp - interaction.createdTimestamp

        interaction.editReply({
            content: `Websocket: ${this.client.ws.ping}ms | API: ${tLatency}ms`
        })
    }
}