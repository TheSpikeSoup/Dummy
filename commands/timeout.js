const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  CommandInteractionOptionResolver,
  PermissionsBitField,
  PermissionFlagsBits,
} = require("discord.js");
const warnSchema = require("../Models/warn");
const mongoose = require("mongoose");
const humanizeDuration = require("humanize-duration");
const { nanoid } = require("nanoid");
const ms = require('ms');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Es como el warn con un mute")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.MuteMembers ||
        PermissionFlagsBits.BanMembers ||
        PermissionFlagsBits.KickMembers ||
        PermissionFlagsBits.ModerateMembers
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("usuario q quieres mutear!11!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("tiempo, tiene q estar en formato 1d 1h 1m")
        .setRequired(true)
    )
    .addStringOption((option) => option.setName("razon").setDescription("razon:V").setMaxLength(512))
    .addBooleanOption((option) =>
      option.setName("warn").setDescription("Warnear?!?")
    ),
  async execute(interaction) {
    const { options, guildId, user } = interaction;
    const target = options.getUser("user");
    const reason = options.getString("razon") || "No se proporciono razón";
    const time = options.getString("time");
    const warn = options.getBoolean("warn") || true;
    const warnDate = new Date(
        interaction.createdTimestamp
        ).toLocaleDateString();
        
    const userTag = `${target.tag}`;
    const errArray = []
    const sucArray = []
    const errembed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setTitle("No se pudo concretar la acción")
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
    if(!target) return interaction.reply({ embeds: [errembed.setDescription("El usuario abandono mi pene")], ephemeral: true })
    const member = await interaction.guild.members.fetch(target.id)
    if (member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)
    ) {
        errArray.push("el usuario es admin negro de mierda")
    }
    if (interaction.guild.ownerId === interaction.member.id) {

    } else if (member.roles.highest.position >= interaction.member.roles.highest.position) {
        errArray.push("el puto negro tiene un rol mas alto q tu")
    }

    if(!ms(time) || ms(time) > ms("28d")) {
        errArray.push("El tiempo proporcionado es invalido o ha pasado el limite de 28 días")
    }
    if (errArray.length) {
        return interaction.reply({ embeds: [errembed.setDescription(errArray.join("\n"))], ephemeral: true })
    }

    member.timeout(ms(time), reason).catch((err) => {
        return interaction.reply({ embeds: [errembed.setDescription("Hubo un error raro:V")], ephemeral: true })
    })
    sucArray.push(`El usuario ${target.tag} fue aislado correctamente durante ${humanizeDuration(ms(time), { language: "es" })}`)
    if (warn === true) {
      warnSchema.findOne(
        { GuildID: guildId, UserID: target.id, UserTag: userTag },
        async (err, data) => {
          if (err) throw err;

          if (!data) {
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
                  Date: warnDate,
                },
              ],
            });
          } else {
            const warnContent = {
              ExecutorId: user.id,
              ExecutorTag: user.tag,
              Reason: reason,
              Number: `${nanoid(10)}`,
              Date: warnDate,
            };
            data.Content.push(warnContent);
          }
          data.save();
        }
      );
      sucArray.push(`Además el usuario fue warneado correctamente`)
    }

    interaction.reply({embeds: [new EmbedBuilder()
        .setColor('#FFFF00')
        .setTitle("Se aisleo al usuario!!1")
        .setDescription(sucArray.join("\n"))
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
        .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })]})

  },
};
