const Spinnies = require("spinnies")
global.spinnies = new Spinnies()

const config = require("./src/System/Config")
const ProstChanClient = require("./src/Structures/ProstChanClient")

const client = new ProstChanClient(config)

spinnies.add("starter", {
    text: "[CLIENT] - Iniciando bot..."
})

client.start()