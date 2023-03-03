const { SlashCommandBuilder, EmbedBuilder, ChannelType, CommandInteractionOptionResolver } = require('discord.js');

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Reproduce lo q busques en el canal de voz donde estás')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('Lo que reproducire wassaaa:')
                .setMaxLength(2000)
                .setRequired(true)
        ),
	async execute(interaction) {
        
        interaction.client.distube = new DisTube(interaction.client, {
            leaveOnStop: false,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            plugins: [
              new SpotifyPlugin({
                emitEventsAfterFetching: true
              }),
              new SoundCloudPlugin(),
              new YtDlpPlugin()
            ]
          })

          if (!interaction.member.voice.channel) {
            interaction.reply({ embeds: [new EmbedBuilder()
              .setColor('#FFFF00')
              .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
              .setFooter({ text: `Dummy Bot`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
              .setTitle("Buscando...")] })
          } else {

            var channel = interaction.channel
            interaction.reply({ embeds: [new EmbedBuilder()
              .setColor('#FFFF00')
              .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
              .setFooter({ text: `Dummy Bot`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
              .setTitle("Buscando...")] })
  
            const status = queue =>
            `Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
              queue.repeatMode ? (queue.repeatMode === 2 ? 'Toda la Queue' : 'Está cancion') : 'Apagado'
            }\` | Autoplay: \`${queue.autoplay ? 'Encendido' : 'Apagado'}\``
          interaction.client.distube
            .on('playSong', (queue, song) =>
              interaction.editReply({ embeds: [new EmbedBuilder()
              .setColor('#FFFF00')
              .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
              .setFooter({ text: `Dummy Bot`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
              .setTitle( `Reproduciendo \`${song.name}\` - \`${song.formattedDuration}\`\nPuesto por: ${
                song.user.tag
              }\n${status(queue)}`)] }
              )
            )
            .on('addSong', (queue, song) =>
              interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setFooter({ text: `Dummy Bot`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
                .setTitle(`Añadido ${song.name} - \`${song.formattedDuration}\` a la queue por ${song.user.tag}`)] }
                )
            )
            .on('addList', (queue, playlist) =>
              interaction.editReply({ embeds: [new EmbedBuilder()
              .setColor('#FFFF00')
              .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
              .setFooter({ text: `Dummy Bot`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
              .setTitle(`Añadida la playlist \`${playlist.name}\` (${
                playlist.songs.length
              } songs) a la queue\n${status(queue)}`)] }
              )
            )
            .on('error', (channel, e) => {
              if (interaction.member.voice.channel) interaction.editReply({ embeds: [new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setFooter({ text: `Dummy Bot`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
                .setTitle(`Hubo un error: ${e.toString().slice(0, 1974)}`)] }
                )
              else console.error(e)
            })
            .once('empty', channel => interaction.channel.send({ embeds: [new EmbedBuilder()
              .setColor('#FFFF00')
              .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
              .setFooter({ text: `Dummy Bot`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
              .setTitle(`Canal de voz vacío. Abandonando...`)] }
              ))
            .on('searchNoResult', (interaction, query) =>
              interaction.channel.send({ embeds: [new EmbedBuilder()
              .setColor('#FFFF00')
              .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
              .setFooter({ text: `Dummy Bot`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
              .setTitle(`No hubo resultado para ${query}`)] })
            )
            .on('finish', queue => queue.textChannel.send({ embeds: [new EmbedBuilder()
              .setColor('#FFFF00')
              .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
              .setFooter({ text: `Queue finalizado!`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
              .setTitle(`No hubo resultado para ${query}`)] }))
            
          
  
          interaction.client.distube.addSong(interaction.member.voice.channel, interaction.options.getString('input'), {
              member: interaction.member,
              textChannel: interaction.channel,
              interaction
            })
          }

	},
};