const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Muestra el avatar del usuario en cuestion')
        .addMentionableOption(option => 
            option.setName('usuario')
                .setDescription('el usuario')
                .setRequired(true)),
	async execute(interaction) {
        const m = interaction.options.getMentionable('usuario')
        const Build = new EmbedBuilder()
        .setColor(m.displayHexColor)
        .setImage(m.displayAvatarURL({ dynamic: true, size: 512 }))
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
        .setTitle(`Avatar de ${m.user.tag}`)
        .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setURL(m.displayAvatarURL())
		await interaction.reply({embeds: [Build]});
	},
};