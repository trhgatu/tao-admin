// src/features/users/services/blogService.ts
import axiosInstance from '@/services/axios';
import type { IMemory } from '@/types';

export interface GetMemoriesParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const getMemories = async (
  params?: GetMemoriesParams
): Promise<{
  data: IMemory[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}> => {
  const res = await axiosInstance.get('/memories', { params });
  return res.data;
};
