// deploy-commands.ts
//
// Deploys the commands in src/commands to discord, so users can see which 
// commands are available to them.

import { client } from './bot';  // Import the client from bot.ts
import { SlashCommandBuilder } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

const commands: any[] = [];

// Read all command files from the 'commands' folder
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'));

console.log(`Found ${commandFiles.length} commands.`)

for (const file of commandFiles) {
    // Dynamically import the command
    const command = require(path.join(__dirname, 'commands', file)).default;

    // Serialize command.data using .toJSON() if it's a SlashCommandBuilder instance
    if (command.data instanceof SlashCommandBuilder) {
        commands.push(command.data.toJSON());
    } else {
        commands.push(command.data);  // If it's already a plain object
    }
}

// Register commands with Discord API when the bot is ready
client.once('ready', async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // Register all the commands
        await client.application?.commands.set(commands);
        
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});
