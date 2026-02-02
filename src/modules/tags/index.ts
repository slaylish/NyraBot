import { OmniClient } from '../../core/client';
import { TagCmd } from './commands/tag';

export default {
    init: (client: OmniClient) => {
        client.commands.set(TagCmd.name, TagCmd);
    }
};
