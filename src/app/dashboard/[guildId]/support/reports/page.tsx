'use client';

import { useParams } from 'next/navigation';
import { ReportTriage } from '@/modules/Support/Reports/ReportTriage';

export default function ReportsPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return <ReportTriage guildId={guildId} />;
}
