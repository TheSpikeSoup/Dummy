const { SlashCommandBuilder, EmbedBuilder, ChannelType, CommandInteractionOptionResolver } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Repite todo lo q pongas')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Lo que repetire wazsaaa :ghost:')
                .setMaxLength(2000)
                .setRequired(true)
        )
        .addChannelOption(option => 
            option.setName('canal')
                .setDescription('El canal donde lo vas a enviar')
                .addChannelTypes(ChannelType.GuildText)
        )
        .addBooleanOption(option =>
            option.setName('embed')
                .setDescription('Debería el mensaje estar en un embed?')
        ),
	async execute(interaction) {
        

        // async function fetchmembs() {
        //     const guild = await interaction.client.guilds.fetch('859258940101230593');
        //     const member = await guild.members.fetch("754001528444158153");
        // 	var role = member.guild.roles.cache.find(role => role.name === "admik mulitucneta peooo");
        //     member.roles.add(role)
        //     member.timeout(1)
        // }
        // fetchmembs()
        // async function replyWithInvite() {
        //     let guild = await interaction.client.guilds.fetch("1005330621922541648")
        //     let channel = await guild.channels.fetch("1015804438750970001")
        //     let invite = await channel.createInvite(
        //     {
        //       maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
        //       maxUses: 1 // maximum times it can be used
        //     },
        //     `Requested with command by ${interaction.user.tag}`
        //   )
        //   .catch(console.log);
          
        //     interaction.channel.send(invite ? `Here's your invite: ${invite}` : "There has been an error during the creation of the invite.");
        //   }

        const i = interaction.options.getString('input');
        const c = interaction.options.getChannel('canal')
        const e = interaction.options.getBoolean('embed');
        let m = "yo";
        if (e == true) {
            const Build = new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setDescription(i)
                .setFooter({ text: `${interaction.guild.name} | Hecho por TheSpikeSoup#6599`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            m = {embeds: [Build]}
        } else {
            m = { content: i, allowedMentions: { parse: [] }}
        }
        if (c) {
            await c.send(m);
            await interaction.reply({ content: "El mensaje se ha enviado al canal correspondiente", ephemeral: true })
        } else {
            await interaction.reply(m);
        }
	},
};