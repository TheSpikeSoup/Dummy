const { SlashCommandBuilder, EmbedBuilder, ChannelType, CommandInteractionOptionResolver, PermissionFlagsBits } = require('discord.js');
const warnSchema = require("../Models/warn")
const mongoose = require("mongoose")
const { nanoid } = require("nanoid")

module.exports = {
    data: new SlashCommandBuilder() 
        .setName('warn')
        .setDescription('Warn:v')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers || PermissionFlagsBits.BanMembers || PermissionFlagsBits.ModerateMembers || PermissionFlagsBits.MuteMembers)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("add")
                .setDescription("Warnea a un usuario :nerd:")
                .addMentionableOption((option) =>
                    option
                        .setName("user")
                        .setDescription("usuario q quieres warnear!11!!!11:nerd")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("razon")
                        .setDescription("La razon obvi :facepal:")
                        .setMaxLength(512)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("check")
                .setDescription("Checkea los warns de un usuario me quiero coger a mi madre")
                .addMentionableOption((option) =>
                    option
                        .setName("user")
                        .setDescription("usuario q quieres ver warnear!11!!!11:nerd")
                        .setRequired(true)
        )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("remove")
                .setDescription("Remueve un warn de un usuario con la iddel warn:v")
                .addMentionableOption((option) =>
                    option
                        .setName("user")
                        .setDescription("usuario q quieresdes warnear!11!!!11:nerd")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                        option
                            .setName("id")
                            .setDescription("La id :v")
                            .setRequired(true)
                    )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("clear")
                .setDescription("Remueve todos los warns de algun usuario en el servidor")
                .addMentionableOption((option) =>
                    option
                        .setName("user")
                        .setDescription("negro q quieres deswarnear!11!!!11:nerd")
                        .setRequired(true)
        )
    ),
    async execute(interaction) {
        const {options, guildId, user, member} = interaction
        const sub = options.getSubcommand(['add', 'remove', 'clear', 'check'])
        const target = options.getMentionable('user')
        const reason = options.getString('razon') || "No se proporciono razón";
        const warnId = options.getString('id')
        const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString()

        const userTag = `${target.user.tag}`

        switch (sub) {
            case 'add':
                if (target.permissionsIn(interaction.channel).has("ADMINISTRATOR")
            ) {
                return interaction.reply({ content: "No puedo, tiene permisos de admik", ephemeral: true })
            }
                warnSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err

                    if(!data) {
                        data = new warnSchema({
                            GuildID: guildId,
                            UserID: target.id,
                            UserTag: userTag,
                            Content: [
                                {
                                    ExecutorId: user.id,
                                    ExecutorTag: user.tag,
                                    Reason: reason,
                                    Number: `${nanoid(10)}`,
                                    Date: warnDate
                                }
                            ]
                        })
                    } else {
                        const warnContent = {
                            ExecutorId: user.id,
                            ExecutorTag: user.tag,
                            Reason: reason,
                            Number: `${nanoid(10)}`,
                            Date: warnDate
                        }
                        data.Content.push(warnContent)
                    }
                    data.save();
                })
                interaction.reply({ embeds: [
                    new EmbedBuilder()
                    .setColor('#FFFF00')
                    .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                    .setTitle(`${userTag} fue warneado!!111!1!!!1`)
                    .setDescription("**Razón**: " + reason)
                    .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                ] })
                break;
        
            case 'check':
                warnSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err

                    if (data) {
                        interaction.reply({ embeds: [
                            new EmbedBuilder()
                            .setColor('#FFFF00')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                            .setTitle(`Check en ${userTag}`)
                            .setDescription(`${data.Content.map((w, i) =>
                                `
                                **ID**: ${w.Number}
                                **Por**: ${w.ExecutorTag}
                                **Fecha**: ${w.Date}
                                **Razón**: ${w.Reason}\n\n
                                `).join(" ")}`)
                            .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        ] })
                    } else {
                        interaction.reply({ embeds: [
                            new EmbedBuilder()
                            .setColor('#FFFF00')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                            .setTitle(`Check en ${userTag}`)
                            .setDescription("Este usuario no tiene warns")
                            .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        ] })
                    }
                })
                break;
            case 'remove':
                warnSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err

                    if (data) {
                        var mas = "No se encontro una id waz"
                        var men = "??"
                        for (var i = data.Content.length - 1; i >= 0; --i) {
                            if (data.Content[i].Number == warnId) {
                                data.Content.splice(i, 1);
                                data.save()
                                mas = `El warn de ${userTag} con la id ${warnId} ha sido eliminad`
                                men = "Se ha removido!11!!1!!"
                            }
                        }
                        if (data.Content.length == 0) {
                            warnSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                                if (err){
                                    console.log(err)
                                }
                                else{
                                    console.log("Deleted U");
                                }
                            })
                        }

                        interaction.reply({ embeds: [
                            new EmbedBuilder()
                            .setColor('#FFFF00')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                            .setTitle(men)
                            .setDescription(mas)
                            .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        ] })
                    } else {
                        interaction.reply({ embeds: [
                            new EmbedBuilder()
                            .setColor('#FFFF00')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                            .setTitle(`???`)
                            .setDescription("Este usuario no tiene warns invesil")
                            .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        ] })
                    }
                })
                break;
            case 'clear':
                warnSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err

                    if (data) {
                        warnSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                            if (err){
                                console.log(err)
                            }
                            else{
                                console.log("Deleted User : ");
                            }
                        }) 
                        interaction.reply({ embeds: [
                            new EmbedBuilder()
                            .setColor('#FFFF00')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                            .setTitle(`Se han removido!11!!1!!`)
                            .setDescription(`Los warn de ${userTag} se han sido eliminad`)
                            .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        ] })
                    } else {
                        interaction.reply({ embeds: [
                            new EmbedBuilder()
                            .setColor('#FFFF00')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                            .setTitle(`???`)
                            .setDescription("Este usuario no tiene warns invesil")
                            .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                        ] })
                    }
                })
                break;
        }

        
    }
}