import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import schedule from "node-schedule";
import dotenv from "dotenv";
import { getRecentSubmissions, solvedInLastHour } from "./leetcode";

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN!;
const CHANNEL_ID = process.env.CHANNEL_ID!;
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME!;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function checkLeetCodeAndNotify() {
  console.log("Checking LeetCode submissions...");

  const submissions = await getRecentSubmissions(LEETCODE_USERNAME);
  console.log("Fetched submissions:", submissions);

  if (solvedInLastHour(submissions)) {
    const channel = (await client.channels.fetch(CHANNEL_ID)) as TextChannel;
    await channel.send(`${LEETCODE_USERNAME} has solved a LeetCode problem in the last hour! 🎉`);
  } else {
    const channel = (await client.channels.fetch(CHANNEL_ID)) as TextChannel;
    await channel.send(`${LEETCODE_USERNAME} has NOT solved a LeetCode problem in the last hour! 😡`);
  }
}

client.once("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  // Run a check immediately on bot startup
  await checkLeetCodeAndNotify();

  // Schedule the bot to check every hour (at minute 0)
  schedule.scheduleJob("0 * * * *", async () => {
    await checkLeetCodeAndNotify();
  });
});

client.login(TOKEN);
