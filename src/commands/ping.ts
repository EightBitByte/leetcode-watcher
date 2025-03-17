// ping.ts
//
// Pings Jeff. DO YOUR LEETCODE, JEFF.

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const replies: string[] = [
    ", you should do your leetcode. Don't make me ask twice.",
    ". Do. Your. LEETCODE. Thanks.",
    ", you know you gotta do it, so just do it! Do your leetcode.",
    ", Leetcode is waiting! It's impolite to keep it waiting.",
    ", how many times do I have to ask you before you actually do your Leetcode?",
    ", time's a-wasting! Get on your leetcode!",
    ", you can do it! Yes you can! You can do your leetcode!",
    ", do your leetcode. NOW! Thank you 😊",
    ". Leetcode is calling to you. Answer the call.",
    ", you're cringe.",
    ", JUST DO IT! Don't let your dreams be dreams. Yesterday, you said tomorrow, so JUST DO IT!"
]

function getRandomReply() {
    const choice = Math.floor(Math.random() * replies.length);

    return replies[choice];
}

const slashCommands = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pings Jeff, telling him to do his leetcode.');

const pingCommand = {
    data: slashCommands,
    async execute(interaction: ChatInputCommandInteraction) {
        console.log('Executing /ping command');

        await interaction.reply(`<@297528653615464458>${getRandomReply()}`);
    },
};


export default pingCommand;
