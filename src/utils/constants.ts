import { getDirname } from './location';
import { join } from 'node:path';

export const CommandsPath = join(getDirname(import.meta.url), '..', 'commands');
export const EventsPath = join(getDirname(import.meta.url), '..', 'events');
