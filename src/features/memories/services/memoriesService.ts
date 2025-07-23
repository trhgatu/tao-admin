import axiosInstance from '@/services/axios';
import type { IMemory } from '@/types';
import type { MemoryInput } from '../validators/memorySchema';

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

export const createMemory = async (data: MemoryInput): Promise<IMemory> => {
  const res = await axiosInstance.post('/memories', data);
  return res.data;
};
