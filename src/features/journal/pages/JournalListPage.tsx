// src/features/users/pages/UserListPage.tsx
import { useEffect, useState } from 'react';
import { getJournals } from '../services/journalService';
import { JournalTable } from '../components';
import type { IJournal } from '@/types';

export const JournalListPage = () => {
  const [journals, setJournals] = useState<IJournal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setLoading(true);
        const res = await getJournals();
        setJournals(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Journals Management</h2>
      {loading ? <p>Loading blogs...</p> : <JournalTable journals={journals} />}
    </div>
  );
};
