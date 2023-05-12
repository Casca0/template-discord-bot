// If you want to remove all registered commands, execute this file in node.

require('dotenv/config');
const { REST, Routes } = require('discord.js');

const { DISCORD_TOKEN, CLIENT_ID } = process.env;


const rest = new REST({ version: 10 }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
	.then(() => console.log('Removed registered commands.'))
	.catch(console.error);
