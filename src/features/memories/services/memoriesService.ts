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
  const res = await axiosInstance.post('/memories/create', data);
  return res.data;
};

export const deleteMemory = async (id: string): Promise<void> => {
  const res = await axiosInstance.delete(`/memories/soft-delete/${id}`);
  return res.data;
};

export const getMemoryById = async (id: string): Promise<IMemory> => {
  const res = await axiosInstance.get(`/memories/${id}`);
  return res.data.data;
};

export const uploadMemoryImage = async (file: File, folder = 'memories') => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await axiosInstance.post(
    `/uploads/upload-image?folder=${folder}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return res.data.data.url;
};
