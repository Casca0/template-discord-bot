// This event fires when the user sends a slash command

import { Events } from 'discord.js';

export const name = Events.InteractionCreate;

export async function execute(interaction, client) {
	// If command is not slash command, return;

	if (!interaction.isChatInputCommand()) return;

	// Get commands collection from client
	const { commands } = client;

	// Get command from collection
	const command = commands.get(interaction.commandName);

	// Executing command
	try {
		await command.execute(interaction);
	}
	catch (e) {
		console.error(e);
		return interaction.followUp(`Ocorreu um erro\n${e}`);
	}

}
