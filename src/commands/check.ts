// check.ts
//
// Implements a command to force check a user's leetcode status.

import { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { solvedToday, userExists } from "../leetcode";

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
        console.log('Executing /check command');

        const username = interaction.options.getString('username');
        
        if (!await userExists(username!)) {
            await interaction.reply({ content: `Oops! ${username} does not exist. Check your spelling and try again.`,
                                      flags: MessageFlags.Ephemeral});
            return;
        }


        const hasSolvedToday: string[] = username == null ? [] : await solvedToday(username);
        let reply: string = `[${username}](https://leetcode.com/u/${username}) `;

        if (hasSolvedToday.length == 0) {
            reply += "has NOT solved any LeetCode problems today! 😡";
        } else {
            reply += `has solved ${hasSolvedToday.length} LeetCode ${hasSolvedToday.length > 1 ? 'problems' : 'problem'} today! 😊\n`;
            hasSolvedToday.forEach((link => {reply += `- ${link}\n`;}))
        }

        await interaction.reply(reply);
    },
};


export default checkCommand;
