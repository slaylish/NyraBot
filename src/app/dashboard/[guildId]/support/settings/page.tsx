'use client';

import { useParams } from 'next/navigation';
import { SupportSettings } from '@/modules/Support/Settings/SupportSettings';

export default function SupportSettingsPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return <SupportSettings guildId={guildId} />;
}
