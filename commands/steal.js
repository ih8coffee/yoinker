new SlashCommandBuilder()
  .setName("steal")
  .setDescription("steals emojis from other servers")
  .addStringOption(option =>
    option
      .setName("emoji")
      .setDescription("the emoji you want to steal")
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("name")
      .setDescription("the name you want to give the emoji")
      .setRequired(true)
  );

async function execute(interaction) {
  const emoji = interaction.options.getString("emoji");
  const name = interaction.options.getString("name");
  const url = `https://cdn.discordapp.com/emojis/${emoji}.png`;

  const response = await fetch(url);
  const buffer = await response.buffer();

  await interaction.guild.emojis.create(buffer, name);
  return interaction.reply(`Emoji has been added!`);
}
