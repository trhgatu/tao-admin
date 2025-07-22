export interface IQuote {
  _id: string;
  text: string;
  author?: string;
  tags: string[];
  language?: string;
  translations: {
    [key: string]: string;
  };
  autoTranslated: boolean;
  status: 'public' | 'private' | 'archived';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
