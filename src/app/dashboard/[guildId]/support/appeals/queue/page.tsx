'use client';

import { useParams } from 'next/navigation';
import { AppealQueue } from '@/modules/Support/Appeals/AppealQueue';

export default function AppealHelperPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return <AppealQueue guildId={guildId} />;
}
