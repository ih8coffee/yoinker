const { Client, GatewayIntentBits, Events } = require("discord.js");
const { token } = require("./config.json");
const fetch = require("node-fetch-commonjs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
});

client.once(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

// prefix "," yoink <emoji> <name>
// account for webp, gif, png, jpg, jpeg

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(",")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "yoink") {
    const emoji = args[0];
    const name = args[1];

    if (!emoji || !name) {
      return message.reply("Please provide an emoji and a name!");
    }

    const emojiRegex = /<(a)?:\w+:(\d+)>/;
    const emojiMatch = emoji.match(emojiRegex);

    const url = emojiMatch
      ? `https://cdn.discordapp.com/emojis/${emojiMatch[2]}.${
          emojiMatch[1] ? "gif" : "webp"
        }`
      : emoji;
    message.guild.emojis
      .create({
        attachment: url,
        name: name,
      })
      .then(emoji => {
        message.reply(`Emoji ${emoji.name} has been added!`);
      })
      .catch(error => {
        console.error(error);
        message.reply("There was an error adding the emoji!");
      });
  }
});

client.login(token);
