export interface IMemory {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  mood?: string;
  date: string;
  tags: string[];
  translations: {
    [key: string]: string;
  };
  autoTranslated: boolean;
  status: 'public';
  isDeleted: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMemoriesResponse {
  success: boolean;
  message: string;
  data: IMemory[];
  total: number;
  currentPage: number;
  totalPages: number;
}
