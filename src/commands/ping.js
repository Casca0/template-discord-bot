// Exemple command

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with PONG!')
	.setDMPermission(false);
export async function execute(interaction) {
	await interaction.reply('PONG!');
}
