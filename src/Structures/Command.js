import { Permissions } from "discord.js"

export default class Command {

	constructor(client, name, options = {}) {
		this.client = client
		this.name = options.name || name
		this.description = options.description || "Sem descrição"
        this.usage = options.usage || "Sem modo de uso"
		this.category = options.category || "Outros"
		this.userPerms = new Permissions(options.userPerms).freeze()
		this.botPerms = new Permissions(options.botPerms).freeze()
		this.ownerOnly = options.ownerOnly || false
		this.ephemeral = options.ephemeral || false
	}

	// eslint-disable-next-line no-unused-vars
	async run({ interaction }) {
		throw new Error(`Faltou o jeito de rodar o comando ${this.name}`);
	}
}