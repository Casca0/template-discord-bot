import { config } from 'dotenv';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'url';

import { Client, GatewayIntentBits, Collection } from 'discord.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

config();

const discordToken = process.env.DISCORD_TOKEN;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
	],
});

client.commands = new Collection();

// Command handler

const commandsPath = join(__dirname, 'commands');

const commandFiles = readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
  }
}

// Event handler

const eventsPath = join(__dirname, 'events');

const eventFiles = readdirSync(eventsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = await import(`./events/${file}`);

	if (event.runsOnce) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(discordToken);
