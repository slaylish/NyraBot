'use client';

import { redirect } from 'next/navigation';

export default function AppealsIndex({ params }: { params: { guildId: string } }) {
  redirect(`/dashboard/${params.guildId}/support/appeals/queue`);
}
