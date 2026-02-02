import { OmniClient } from '../../core/client';
import { Welcome } from './commands/welcome';
import { GuildConfig } from './models/GuildConfig';

export default {
    init: (client: OmniClient) => {
        client.commands.set(Welcome.name, Welcome);

        client.on('guildMemberAdd', async (member) => {
             const config = await GuildConfig.findOne({ guildId: member.guildID });
             if (!config || !config.welcome.enabled || !config.welcome.channelId) return;

             const channel = client.getChannel(config.welcome.channelId);
             if (channel && channel.type === 0) { // TextChannel
                 const msg = config.welcome.message
                     .replace('{user}', `<@${member.id}>`)
                     .replace('{server}', member.guild.name);
                 
                 await client.rest.channels.createMessage(channel.id, { content: msg });
             }
        });
    }
};
