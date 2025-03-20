// set-tz.ts
//
// Implements a command to set the timezone for updates.

import { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags, SlashCommandBooleanOption } from "discord.js";

const slashCommands = new SlashCommandBuilder()
  .setName('set-timezone')
  .setDescription('sets the timezone for each day\'s updates')
  .addStringOption(option => 
    option.setName('timezone')
      .setRequired(true)
      .addChoices(
        { name: 'EST', value: '-5' },
        { name: 'EDT', value: '-4' },
        { name: 'CST', value: '-6' },
        { name: 'CDT', value: '-5' },
        { name: 'MST', value: '-7' },
        { name: 'MDT', value: '-6' },
        { name: 'PST', value: '-8' },
        { name: 'PDT', value: '-7' },
        { name: 'AKST', value: '-9' },
        { name: 'AKDT', value: '-8' },
        { name: 'HST', value: '-10' },
        { name: 'HDT', value: '-9' },
        { name: 'SST', value: '-11' },
        { name: 'SDT', value: '-10' },
        { name: 'CHST', value: '+10' }
      )
  )


const timezoneCommand = {
  data: slashCommands,
  async execute(interaction: ChatInputCommandInteraction) {
    console.log('Setting timezone...');

    const timezone = interaction.options.getString('timezone');

    await interaction.reply({ content: `Timezone set to ${timezone}!`, 
                              flags: MessageFlags.Ephemeral });
  }
}

export default timezoneCommand;