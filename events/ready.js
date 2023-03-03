const { Events, ActivityType } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder, ChannelType, CommandInteractionOptionResolver, PermissionFlagsBits } = require('discord.js');
const mongoose = require("mongoose")
const config = require("../config.json")

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await mongoose.connect(config.mongodb, {keepAlive: true})
		if (mongoose.connect) {
			console.log("conectado :nerd:")
		}
		console.log(`Está listo! Logeado como ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: 'Insomnio'}], status: 'idle', type: ActivityType.Watching });
	},
};