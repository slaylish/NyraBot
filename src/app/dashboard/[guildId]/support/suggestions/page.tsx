'use client';

import { useParams } from 'next/navigation';
import { SuggestionKanban } from '@/modules/Support/Suggestions/SuggestionKanban';

export default function SuggestionsPage() {
  const params = useParams();
  const guildId = params?.guildId as string;

  return <SuggestionKanban guildId={guildId} />;
}
