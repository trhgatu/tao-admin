// src/features/users/pages/UserListPage.tsx
import { useEffect, useState } from 'react';
import { getMemories } from '../services/memoriesService';
import { MemoriesTable } from '../components';
import type { IMemory } from '@/types';

export const MemoriesListPage = () => {
  const [memories, setMemories] = useState<IMemory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        const res = await getMemories();
        setMemories(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchMemories();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Memories Management</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <MemoriesTable memories={memories} />
      )}
    </div>
  );
};
