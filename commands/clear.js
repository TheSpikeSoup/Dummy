const { SlashCommandBuilder, EmbedBuilder, ChannelType, CommandInteractionOptionResolver, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() 
        .setName('clear')
        .setDescription('Elimina un numero de mensajes')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option => 
            option.setName('numero')
            .setDescription('Numero de mensajes a borrar')
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
        )
        .addMentionableOption(option => 
            option.setName('usuario')
            .setDescription('Usuario a quien quieres kickear')
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('numero')
        const target = interaction.options.getMentionable('usuario')


        let Build = new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        
        if(target) {
            const messages = await interaction.channel.messages.fetch({
                limit: amount
            })
            let i = 0
            let filtered = [];
            await messages.filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg)
                    i++
                }
            })
            await interaction.channel.bulkDelete(filtered).then(messages => {
                Build.setDescription(messages.size==1?`Se borró 1 mensaje del usuario ${target.tag}`:`Se borraron ${messages.size} mensajes del usuario ${target.tag}`)
                interaction.reply({embeds: [Build], ephemeral: true})
            })
        } else {
            await interaction.channel.bulkDelete(amount, true).then(messages => {
                Build.setDescription(messages.size==1?`Se borró 1 mensaje`:`Se borraron ${messages.size} mensajes`)
                interaction.reply({embeds: [Build], ephemeral: true})
            })
        }
    }
}