const { SlashCommandBuilder, EmbedBuilder, ChannelType, CommandInteractionOptionResolver, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Revoca el baneo de un usuario')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option => 
            option.setName('id')
                .setDescription('El id del usuario')
                .setRequired(true)
        ),
	async execute(interaction) {
        const userId = interaction.options.getString("id")
        try {
            let user = interaction.client.users.cache.get(userId)
    
            await interaction.guild.members.unban(userId)
            return await interaction.reply({ embeds: [new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setDescription(`Se desbaneo al usuario ${user.tag}`)
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })], ephemeral: true})
        } catch(err) {
            return interaction.reply({ embeds: [new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setDescription(`Proporciona una ID valida para el desbaneo`)
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })], ephemeral: true })
                

        }
    }
}