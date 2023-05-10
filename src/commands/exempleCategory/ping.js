// Exemple command

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replys with PONG!')
		.setDMPermission(false),
	async execute(interaction) {
		return interaction.followUp('PONG!');
	},
};
