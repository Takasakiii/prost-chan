import Event from "../../Structures/Event.js"

export default class ReadyEvent extends Event {

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