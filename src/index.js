require('dotenv/config');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const discordToken = process.env.DISCORD_TOKEN;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: Partials.Channel,
});

client.commands = new Collection();

// Command handler

const commandsPath = join(__dirname, 'commands');

const commandsFolders = readdirSync(commandsPath);

for (const folder of commandsFolders) {
	const commandFiles = readdirSync(`${commandsPath}/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`${commandsPath}/${folder}/${file}`);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(
				`[ERRO] O commando em ${folder} está sem as propriedades requeridas!`,
			);
		}
	}
}

// Event handler

const eventsPath = join(__dirname, 'events');

const eventFiles = readdirSync(eventsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(discordToken);
