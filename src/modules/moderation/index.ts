import { OmniClient } from '../../core/client';
import { Kick } from './commands/kick';
import { Ban } from './commands/ban';
import { Purge } from './commands/purge';

export default {
    init: (client: OmniClient) => {
        client.commands.set(Kick.name, Kick);
        client.commands.set(Ban.name, Ban);
        client.commands.set(Purge.name, Purge);
    }
};
