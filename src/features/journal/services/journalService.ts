// src/features/users/services/blogService.ts
import axiosInstance from '@/services/axios';
import type { IJournal } from '@/types';

export interface GetJournalsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const getJournals = async (
  params?: GetJournalsParams
): Promise<{
  data: IJournal[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}> => {
  const res = await axiosInstance.get('/journals', { params });
  return res.data;
};
