// bot.ts
//
// Implements the scheduling and basic function of the bot.

import { Client, GatewayIntentBits, TextChannel, Collection } from "discord.js";
import schedule from "node-schedule";
import dotenv from "dotenv";
import { getRecentSubmissions, solvedInLastHour } from "./leetcode";
import { readCommands } from "./read-commands"
import { Command } from "./types/CommandType";

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN!;
const CHANNEL_ID = process.env.CHANNEL_ID!;
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME!;

export const client = new Client({ 
  intents: [GatewayIntentBits.Guilds]
});

let commands: Collection<string, Command> = readCommands();

async function checkLeetCodeAndNotify() {
  console.log("Checking LeetCode submissions...");

  const submissions = await getRecentSubmissions(LEETCODE_USERNAME);
  console.log("Fetched submissions:", submissions);

  if (solvedInLastHour(submissions)) {
    const channel = (await client.channels.fetch(CHANNEL_ID)) as TextChannel;
    await channel.send(`${LEETCODE_USERNAME} has solved a LeetCode problem (${submissions[0].title})! 🎉`);
  } 
}

client.once("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  // Schedule the bot to check every hour (at minute 0)
  schedule.scheduleJob("0 * * * *", async () => {
    await checkLeetCodeAndNotify();
  });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);  // Execute the command's function
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.login(TOKEN);
