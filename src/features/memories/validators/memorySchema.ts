import { z } from 'zod';
import { MemoryMoodEnumOptions, ContentStatusEnumOptions } from '@/enums';

export const memorySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  location: z.string().optional(),
  mood: z.enum(MemoryMoodEnumOptions, {
    errorMap: () => ({ message: 'Please select a valid mood' }),
  }),
  date: z.coerce.date().optional(),
  status: z.enum(ContentStatusEnumOptions),
  tags: z.array(z.string()),
});

export type MemoryInput = z.infer<typeof memorySchema>;
