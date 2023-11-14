// This event triggers on successful client connection

import { Events } from 'discord.js';

export const name = Events.ClientReady;

export const runsOnce = true;

export async function execute(client) {
	console.log(`🤖 ${client.user.tag}`);
	return;
}
