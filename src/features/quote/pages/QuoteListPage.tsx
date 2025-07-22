// src/features/users/pages/UserListPage.tsx
import { useEffect, useState } from 'react';
import { getQuotes } from '../services/quoteService';
import { QuoteTable } from '../components';
import type { IQuote } from '@/types';

export const QuoteListPage = () => {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await getQuotes();
        setQuotes(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Quotes Management</h2>
      {loading ? <p>Loading blogs...</p> : <QuoteTable quotes={quotes} />}
    </div>
  );
};
