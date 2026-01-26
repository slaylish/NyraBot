'use client';

import { useParams } from 'next/navigation';
import { OmniInbox } from '@/modules/Support/Tickets/OmniInbox';

export default function InboxPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return <OmniInbox guildId={guildId} />;
}
