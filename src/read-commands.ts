// read-commands.ts

import { Collection } from 'discord.js';
import * as path from 'path';
import * as fs from 'fs';
import { Command } from './types/CommandType';

export function readCommands(): Collection<string, Command> {
    let commands: Collection<string, Command> = new Collection();

    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
            .filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, 'commands', file)).default;
        commands.set(command.data.name, command);
    }

    return commands;
}