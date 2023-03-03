const { SlashCommandBuilder, EmbedBuilder, ChannelType, CommandInteractionOptionResolver, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() 
        .setName('kick')
        .setDescription('Kickea a un miembro del servidor')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers || PermissionFlagsBits.KickMembers)
        .addUserOption(option => 
            option.setName('usuario')
            .setDescription('Usuario a quien quieres kickear')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('razon')
            .setDescription('La razón del porq quieres kickear al usuario')
        ),
    async execute(interaction) {
        const usuario = interaction.options.getUser('usuario')
        const razon = interaction.options.getString('razon')
        try {
            const member = await interaction.guild.members.fetch(usuario.id)
            const cmember = await interaction.guild.members.fetch('1066087483542077521')
            var d = "";
    
            if (interaction.options.getInteger("dias")) {
                d = `, por ${interaction.options.getInteger("dias")} días`
            }
    
            const errembed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setDescription(`No puedes tomar acciones con ${usuario.tag} porq tiene un rol mas alto :nerd:`)
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setDescription(`Se kickeo al usuario ${usuario.tag}, por la razón: ${razon}` + d)
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            const embedw = new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setDescription(`Se kickeo al usuario ${usuario.tag}` + d)
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    
                if (interaction.guild.ownerId === member.id) {
                    return interaction.reply({ embeds: [new EmbedBuilder()
                        .setColor('#FFFF00')
                        .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                    .setDescription(`No puedo kickear al owner maldito invesil`)
                    .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })], ephemeral: true })
            }
            if (interaction.guild.ownerId === interaction.member.id) {
                await member.kick(razon)
                if (!razon) {
                    await interaction.reply({ embeds: [embedw]})
                } else {
                    await interaction.reply({ embeds: [embed]})
                }
                return
            }
            if (member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) {
                return interaction.reply({ embeds: [new EmbedBuilder()
                    .setColor('#FFFF00')
                    .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                    .setDescription(`No puedo kickear a este usuario porq tiene admik`)
                    .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })], ephemeral: true })
            }
            if (member.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({ embeds: [errembed], ephemeral: true })
            }
            await member.kick(razon)
            if (!razon) {
                await interaction.reply({ embeds: [embedw]})
            } else {
                await interaction.reply({ embeds: [embed]})
            }
        } catch(err) {
            return interaction.reply({ embeds: [new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setDescription(`No encuentro al usuario en cuestión`)
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })], ephemeral: true })
        }


        }
    }