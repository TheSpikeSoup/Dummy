const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Quien mierda usa ping enfermito culiao'),
	async execute(interaction) {
        const Build = new EmbedBuilder()
        .setColor('#FFFF00')
        .setTitle('**Pong!**')
        .setDescription(`🏓 Latencia: ${Math.abs(Date.now() - interaction.createdTimestamp)}ms.`)
        .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
		await interaction.reply({embeds: [Build]});
	},
};
