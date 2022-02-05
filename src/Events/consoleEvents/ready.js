const Event = require("../../Structures/Event")

module.exports = class ReadyEvent extends Event {

    run () {

        spinnies.succeed("starter", {
            text: "[CLIENT] - Iniciado com sucesso"
        })

        spinnies.succeed("loadEvents", {
            text: "[UTILS] - Eventos carregados com sucesso"
        })

        spinnies.succeed("loadCommands", {
            text: "[UTILS] - Comandos carregados com sucesso"
        })
    }
}