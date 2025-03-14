// ping.ts
//
// Pings Jeff. DO YOUR LEETCODE, JEFF.

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const slashCommands = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pings Jeff, telling him to do his leetcode.');

const pingCommand = {
    data: slashCommands,
    async execute(interaction: ChatInputCommandInteraction) {
        console.log('Executing /ping command');

        await interaction.reply('<@297528653615464458>, do your leetcode. NOW! Thank you 😊');
    },
};


export default pingCommand;
