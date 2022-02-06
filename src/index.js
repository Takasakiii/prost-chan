import Spinnies from "spinnies"
global.spinnies = new Spinnies()

import config from "./System/Config.js"
import ProstChanClient from "./Structures/ProstChanClient.js"

const client = new ProstChanClient(config)

spinnies.add("starter", {
    text: "[CLIENT] - Iniciando bot..."
})

client.start()