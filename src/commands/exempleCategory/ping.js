// Exemple command

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with PONG!')
		.setDMPermission(false),
	async execute(interaction) {
		return interaction.followUp('PONG!');
	},
};
