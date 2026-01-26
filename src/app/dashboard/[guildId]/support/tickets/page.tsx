'use client';

import { redirect } from 'next/navigation';

export default function TicketsIndex({ params }: { params: { guildId: string } }) {
  redirect(`/dashboard/${params.guildId}/support/tickets/panels`);
}
