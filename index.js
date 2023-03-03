const { GatewayIntentBits, Collection, Client, Events, ActivityType, REST, Routes } = require('discord.js');
const fs = require('node:fs');
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const path = require('node:path');
const Booru = require('booru')
const { BooruError, sites } = require('booru')

//ol

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates
    ]
});



const { clientId, guildId, token } = require('./config.json');
const { loadCommands } = require('./handlers/commandHandler');
const { eventLoad } = require('./handlers/eventHandler');



client.commands = new Collection();



client.login(token).then(() => {
	eventLoad(client)
	loadCommands(client)
})


