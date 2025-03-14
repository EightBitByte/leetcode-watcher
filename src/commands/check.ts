// check.ts
//
// Implements a command to force check a user's leetcode status.

import { SlashCommandBuilder, ChatInputCommandInteraction, User } from "discord.js";
import { solvedToday } from "../leetcode";

const slashCommands = new SlashCommandBuilder()
        .setName('check')
        .setDescription('checks the user\'s progress on LeetCode today')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('specified user\'s LeetCode username')
                .setRequired(true));

const checkCommand = {
    data: slashCommands,
    async execute(interaction: ChatInputCommandInteraction) {
        const username = interaction.options.getString('username');
        const hasSolvedToday: string[] = username == null ? [] : await solvedToday(username);
        let reply: string = `[${username}](https://leetcode.com/u/${username}) `;

        if (hasSolvedToday.length == 0) {
            reply += "has NOT solved any LeetCode problems today! 😡";
        } else {
            reply += `has solved ${hasSolvedToday.length} LeetCode problems today! 😊\n`;
            hasSolvedToday.forEach((link => {reply += `- ${link}\n`;}))
        }

        await interaction.reply(reply);
    },
};


export default checkCommand;