import Spinnies from "spinnies"
import config from "./System/Config.js"
import ProstChanClient from "./Structures/ProstChanClient.js"

global.spinnies = new Spinnies()

const client = new ProstChanClient(config)

spinnies.add("starter", {
    text: "[CLIENT] - Iniciando bot..."
})

client.start()