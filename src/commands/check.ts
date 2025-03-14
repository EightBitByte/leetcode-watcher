// check.ts
//
// Implements a command to force check a user's leetcode status.

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const slashCommands = new SlashCommandBuilder()
        .setName('check')
        .setDescription('checks the user\'s progress on LeetCode today.')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Specified user\'s LeetCode Username.')
                .setRequired(true));

const checkCommand = {
    data: slashCommands,
    async execute(interaction: ChatInputCommandInteraction) {
        const username = interaction.options.getString('username');
        await interaction.reply(`Checking progress for user: ${username}`);
    },
};


export default checkCommand;