import { Client, Options, Collection, Permissions } from "discord.js"
import Util from "./Utils.js"

export default class ProstChanClient extends Client {
    constructor(options = {}) {
        super({
            intents: 5633,
            restTimeOffset: 0,
            allowedMentions: {
                parse: [
                    "users",
                    "roles"
                ]
            },
            makeCache: Options.cacheWithLimits({
                MessageManager: 0,
                PresenceManager: 0,
                UserManager: 0,
                GuildBanManager: 0,
                GuildEmojiManager: 0,
                StageInstanceManager: 0,
                ThreadMemberManager: 0
            })
        })

        this.validate(options)

		this.commands = new Collection()

		this.events = new Collection()

		this.utils = new Util(this)

		this.settings = {
			color: "ab55ed",
            prefix: options.prefix
		}

		this.owners = options.owners
    }

    validate(options) {
		if (typeof options !== "object") throw new TypeError("As opçoes so podem ser objetos")

		if (!options.token) throw new Error("Defina um token")
		this.token = options.token;

		if (!options.prefix) throw new Error("Defina um prefix")
		if (typeof options.prefix !== "string") throw new TypeError("Prefix apenas string")
		this.prefix = options.prefix
		
		if (!options.defaultPerms) throw new Error("Defina as permissoes")
		this.defaultPerms = new Permissions(options.defaultPerms).freeze()
	}


	async start(token = this.token) {
		this.utils.loadCommands().catch((e) => {
            console.log(e)
            spinnies.fail("loadCommands", {
                text: "[UTILS] - Falha ao carregar comandos"
            })
        })
        
		//this.utils.loadEvents().catch((e) => {
            //console.log(e)
            //spinnies.fail("loadEvents", {
               // text: "[UTILS] - Falha ao carregar eventos"
            //})
        //})

		super.login(token).catch(() => {
            spinnies.fail("starter", {
                text: "[CLIENT] - Falha ao iniciar o bot"
            })
        })
	}
}