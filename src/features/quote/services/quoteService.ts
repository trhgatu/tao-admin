// src/features/users/services/blogService.ts
import axiosInstance from '@/services/axios';
import type { IQuote } from '@/types';

export interface GetQuotesParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const getQuotes = async (
  params?: GetQuotesParams
): Promise<{
  data: IQuote[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}> => {
  const res = await axiosInstance.get('/quotes', { params });
  return res.data;
};
