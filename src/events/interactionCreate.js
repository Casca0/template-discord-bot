// This event fires when the user sends a slash command

const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {

		// If command is not slash command, return;

		if (!interaction.isChatInputCommand()) return;

		// Get commands collection from client

		const { commands } = client;

		// Get command from collection

		const command = commands.get(interaction.commandName);

		// Optional but i like the aesthetic when replying to commands

		await interaction.deferReply();

		// Executing command

		try {
			await command.execute(interaction);
		}
		catch (e) {
			console.error(e);
			return interaction.followUp(`Ocorreu um erro\n${e}`);
		}

	},
};
