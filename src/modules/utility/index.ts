import { OmniClient } from '../../core/client';
import { Ping } from './commands/ping';
import { ServerInfo } from './commands/server';
import { UserInfo } from './commands/user';

export default {
    init: (client: OmniClient) => {
        client.commands.set(Ping.name, Ping);
        client.commands.set(ServerInfo.name, ServerInfo);
        client.commands.set(UserInfo.name, UserInfo);
    }
};
