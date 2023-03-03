
async function loadCommands(client) {
    const {loadFiles} = require("../functions/fileLoader")
    const ascii = require("ascii-table")
    const path = require('node:path');
    const { REST, Routes } = require('discord.js');
    const fs = require('node:fs');
    const { clientId, guildId, token } = require('./../config.json');
    const table = new ascii().setHeading("Commands", "Status")
    const ownerCommands = [];
    const OwnerPath = path.join(__dirname, "..", "owner!");
    const OwnerFiles = fs.readdirSync(OwnerPath).filter(file => file.endsWith('.js'))
    const rest = new REST({ version: '10' }).setToken(token);
    await client.commands.clear()

    let commandsArray = []

    const Files = await loadFiles("commands")

    for (const file of OwnerFiles) {
        const filePath = path.join(OwnerPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
        ownerCommands.push(command.data.toJSON());
    }

    Files.forEach((file) => {
        const command = require(file)
        client.commands.set(command.data.name, command)

        commandsArray.push(command.data.toJSON())

        table.addRow(command.data.name, "loaded")
    })

    client.application.commands.set(commandsArray)

        try {
        // 		// console.log(`Started refreshing ${commands.length} application (/) commands.`);
        
        // 		// const data = await rest.put(
        // 		// 	Routes.applicationCommands(clientId),
        // 		// 	{ body: commands },
        // 		// );
                const data2 = await rest.put(
                    Routes.applicationGuildCommands(clientId, "1066852127592431709"),
                    { body: ownerCommands },
                );
                console.log(`Prohibido se han cargado ${data2.length} comandos de owner`);
        // 		// console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    
    return console.log(table.toString(), "\nComandos cargados")
}

module.exports = {loadCommands}