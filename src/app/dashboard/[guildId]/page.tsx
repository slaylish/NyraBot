import { redirect } from 'next/navigation';

export default function GuildRoot({ params }: { params: { guildId: string } }) {
  // Always redirect to /home
  redirect(`/dashboard/${params.guildId}/home`);
}
