export interface IJournal {
  _id: string;
  rawContent: string;
  translations: Record<string, string>;
  autoTranslated: boolean;
  status: 'public' | 'private' | string;
  isDeleted: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
